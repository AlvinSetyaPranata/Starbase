const string = `
<div class="container" id="parent">
    hello
    <div class="child1">
        <p>Alvin Setya Pranata</p>
    </div>

    This should be on root and between child1 and child2 element
    
    <div class="child2">
        <p>12</p>
    </div>
</div>
`

const tagNameExp = /(?<=<)[a-zA-Z]+(?=.*>)/g
const openerTags = /<[a-zA-Z]*[^<]*>/g
const attrExp = /[a-zA-Z]*=("|')\w+("|')/g
const closerTags = /(?<=<\/)\w+(?=>)/g
const contentExp = /(?<=<.*>)[^<>]*/g



function isClosedTag(stringTag){
    const closer = stringTag.match(closerTags)

    
    if (closer) return closer[0]
    return
}


function setAttr(element, attributes) {
    if (!attributes) return

    attributes.map(attr => {
        element.setAttribute(...attr.split("="))
    })
}


function identifiy(matchObj) {
    const name = matchObj[0].match(tagNameExp)
    const attributes = matchObj[0].match(attrExp)

    const element = document.createElement(name)

    setAttr(element, attributes)

    if (!name) return isClosedTag(matchObj[0])

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





function isElement(stringHTML) {
    if (stringHTML.includes("<") | stringHTML.includes(">")) return true

    return false
}


function createRoot(children) {
    const rootElement = document.createElement("div")
    rootElement.setAttribute("id", "root")
    rootElement.appendChild(children.element)

    const rootDOM = {
        type : "div",
        attributes : "",
        children: children,
        state: {},
        element: rootElement
    }

    return rootDOM
    
}


function structVDOM(type, stringHTML) {
    
    const openerStages = []
    const componentTree = []
    let match    


    while((match = openerTags.exec(stringHTML))) {
        const objOrStr = identifiy(match)
        
        if (typeof objOrStr == "string") {
            // Meaning it's close tag
            const closeTagFirstIndex = match.index
            
            const openers = openerStages.pop()
            openers.endIndex = closeTagFirstIndex + match[0].length

            const parentReference = openerStages[openerStages.length -1 ]
            
            const childrens = stringHTML.slice(openers.startIndex + openers.length, closeTagFirstIndex).trim()

            if (!isElement(childrens)) {            
                const textElement = document.createTextNode(childrens)
                openers.element.appendChild(textElement)
            }             
            // if undefiened then call append DOM tree
            
            if (parentReference) {
                const childrenLength = parentReference.children.length
                const siblingsNode = parentReference.children[childrenLength - 1]

                if (childrenLength >= 1) {
                    // Meaning have a siblings before

                    const childrenBefore = stringHTML.slice(siblingsNode.endIndex, openers.startIndex).trim()
                    if (!isElement(childrenBefore) && childrenBefore != "") {
                        const textElement2 = document.createTextNode(childrenBefore)
                        parentReference.children.push(textElement2)
                        parentReference.element.appendChild(textElement2)
                    } 

                } else {
                    // Meaning have a siblings after
                    // Append all non elements before the current element to the parent
                    const childrenBefore = stringHTML.slice(parentReference.startIndex + parentReference.length, openers.startIndex).trim()
                    if (!isElement(childrenBefore) && childrenBefore != "") {
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
            // console.log(objOrStr);

            openerStages.push(objOrStr)
        }
    }


    const componentElement = document.createElement(type)
    
    componentTree.forEach(child => componentElement.appendChild(child.element))

    return {
        type: type,
        attributes: [],
        state: {},
        children: componentTree,
        element: componentElement
    }

}

