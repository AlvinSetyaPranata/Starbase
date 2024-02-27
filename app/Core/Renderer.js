export class VDomNodes {
    constructor(tag_name, attributes) {
        this.state = {}
        this.tag_name = tag_name
        this.attibutes = attributes
        this.element = document.createElement(this.tag_name)
    }

    render() {
        // Create a pre-render HTML element
        let children = this.structure()

        // Set all user specified attributes to the element
        Object.entries(this.attibutes).forEach(([attribute, value]) => {
            this.element.setAttribute(attribute, value)
        })


        // Append all child into element
        this.element.innerHTML = children

        return this.element
    }


    // This method should be override by the user
    structure() {}

}



export class RootDOM {
    constructor(node) {
        this.root = document.createElement("div")
        this.root.setAttribute("id", "STARBASE_APP")

        this.childrenNode = new node()

        this.init(this.childrenNode)
    }

    init(node) {
        this.root.appendChild(node.render())
        document.body.appendChild(this.root)   
    }

}


