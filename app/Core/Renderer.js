const tagNameExp = /(?<=<)[a-zA-Z]+(?=.*>)/g
const openerTags = /<[a-zA-Z]*[^<]*>/g
const attrExp = /[a-zA-Z]*=("|')\w+("|')/g
const closerTags = /(?<=<\/)\w+(?=>)/g
const contentExp = /(?<=<.*>)[^<>]*/g
const singleTagExp =  /<[a-zA-Z]*[^<]*\/>/g

export class Component {
    constructor(name, props) {
        this.componentType = name,
        this.componentProps = {},
        this.componentParent = null
        this.componentElement = document.createElement(name)
        this.componentDOMTree = {}
        this.state = {}

        this.setParentUp(props)
    }

    setParentUp(props) {
        Object.keys(props).forEach(propKey => {
            if (propKey.startsWith("on")) {
                this.setEventListener(this.componentElement, propKey.slice(2), props[propKey])
            } else {
                this.componentElement.setAttribute(propKey, props[propKey])
                this.componentProps[propKey] = props[propKey]
            }

        })
    }


    setEventListener(element, type, listener) {
        element.addEventListener(type, listener)
    }


    isClosedTag(stringTag){
        const closer = stringTag.match(closerTags)

        
        if (closer) return closer[0]
        return
    }

    isSingleTag(stringTag){
        return stringTag.match(singleTagExp)
    }


    setAttr(element, attributes) {
        if (!element || !attributes) return

        attributes.map(attr => {
            const splitedAttr = attr.split("=")

            if (splitedAttr[0].startsWith("on")) {
                element.addEventListener(splitedAttr[0], splitedAttr[1])
            } else {
                element.setAttribute(splitedAttr[0], splitedAttr[1])
            }

        })
    }


    identifiy(matchObj) {
        const name = matchObj[0].match(tagNameExp)
        const attributes = matchObj[0].match(attrExp)

        const element = document.createElement(name)

        this.setAttr(element, attributes)

        if (!name) return this.isClosedTag(matchObj[0])

        return {
            name: name[0],
            attributes: attributes,
            startIndex: matchObj.index,
            endIndex: 0,
            length: matchObj[0].length,
            element: element,
            children: [],
            state: {}
        }

    }


    isElement(stringHTML) {
        if (stringHTML.includes("<") | stringHTML.includes(">")) return true

        return false
    }

    compile() {
        
        const stringHTML = this.structure()
        const openerStages = []
        const componentTree = []
        let match    
    
    
        while((match = openerTags.exec(stringHTML))) {
            const objOrStr = this.identifiy(match)

            if (typeof objOrStr == "string") {
                // Meaning it's close tag
                const closeTagFirstIndex = match.index
                
                const openers = openerStages.pop()
                openers.endIndex = closeTagFirstIndex + match[0].length
    
                
                const childrens = stringHTML.slice(openers.startIndex + openers.length, closeTagFirstIndex).trim()
                
                if (!this.isElement(childrens)) {            
                    const textElement = document.createTextNode(childrens)
                    openers.element.appendChild(textElement)
                }             
                const parentReference = openerStages[openerStages.length -1 ]
                
                if (parentReference) {
                    const childrenLength = parentReference.children.length
                    const siblingsNode = parentReference.children[childrenLength - 1]
    
                    if (childrenLength >= 1) {
                        // Meaning have a siblings before
    
                        const childrenBefore = stringHTML.slice(siblingsNode.endIndex, openers.startIndex).trim()
                        if (!this.isElement(childrenBefore) && childrenBefore != "") {
                            const textElement2 = document.createTextNode(childrenBefore)
                            parentReference.children.push(textElement2)
                            parentReference.element.appendChild(textElement2)
                        } 
    
                    } else {
                        // Meaning have a siblings after
                        // Append all non elements before the current element to the parent
                        const childrenBefore = stringHTML.slice(parentReference.startIndex + parentReference.length, openers.startIndex).trim()
                        if (!this.isElement(childrenBefore) && childrenBefore != "") {
                            const textElement2 = document.createTextNode(childrenBefore)
                            parentReference.children.push(textElement2)
                            parentReference.element.appendChild(textElement2)
                        } 
                    }
                    
                    parentReference.children.push(openers)
                    parentReference.element.appendChild(openers.element)
    
    
                } else {
    
                    // Meaning it's a direct children of the component root element
                    componentTree.push(openers)
                }
    
    
            } else if ( typeof objOrStr == "object") {
                
                if (this.isSingleTag(match[0])) {
                    const parentReference = openerStages[openerStages.length - 1]

                    if (parentReference) {
                        const childrenLength = parentReference.children.length
                        const siblingsNode = parentReference.children[childrenLength - 1]
        
                        if (childrenLength >= 1) {
                            // Meaning have a siblings before
        
                            const childrenBefore = stringHTML.slice(siblingsNode.endIndex, objOrStr.startIndex).trim()
                            if (!this.isElement(childrenBefore) && childrenBefore != "") {
                                const textElement2 = document.createTextNode(childrenBefore)
                                parentReference.children.push(textElement2)
                                parentReference.element.appendChild(textElement2)
                            } 
        
                        } else {
                            // Meaning have a siblings after
                            // Append all non elements before the current element to the parent
                            const childrenBefore = stringHTML.slice(parentReference.startIndex + parentReference.length, objOrStr.startIndex).trim()
                            if (!this.isElement(childrenBefore) && childrenBefore != "") {
                                const textElement2 = document.createTextNode(childrenBefore)
                                parentReference.children.push(textElement2)
                                parentReference.element.appendChild(textElement2)
                            } 
                        }
                        
                        parentReference.children.push(objOrStr)
                        parentReference.element.appendChild(objOrStr.element)
        
        
                    } else {
        
                        // Meaning it's a direct children of the component root element
                        componentTree.push(objOrStr)
                    }
                    continue
                }

                openerStages.push(objOrStr)
            }
        }

        if (componentTree.length == 0 && stringHTML.length > 0) {
            // There are no element found but found a text
            const textNode = document.createTextNode(stringHTML)
            this.componentElement.appendChild(textNode)
        }
            
        componentTree.forEach(child => this.componentElement.appendChild(child.element))
    
        this.componentDOMTree = {
            type: this.componentType,
            attributes: this.componentProps,
            state: {},
            children: componentTree,
            element: this.componentElement
        }
    
    }


    render(parentNode) {
        // Required for re-render
        this.componentParent = parentNode
        parentNode.appendChild(this.componentElement)
    }

    // Methods to override
    structure(){}
}


export class createRootDOM {
    constructor(parent) {
        this.parent = parent
        this.element = document.createElement("div")
        this.setup()
    }

    setup() {
        this.element.setAttribute("id", "STARBASE_APP")
    }


    render(child) {
        this.element.appendChild(child)
        this.parent.appendChild(this.element)
    }
}