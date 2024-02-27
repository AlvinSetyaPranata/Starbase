export class VDomNodes {
    constructor(tag_name, attributes) {
        this.state = {}
        this.tag_name = tag_name
        this.attibutes = attributes
    }

    render(children) {
        // Create a pre-render HTML element
        let element = document.createElement(this.tag_name)

        // Set all user specified attributes to the element
        Object.entries(this.attibutes).forEach(([attribute, value]) => {
            element.setAttribute(attribute, value)
        })


        // Append all child into element
        element.innerHTML = children

        return element
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
        this.root.appendChild(node.render(node.structure()))
        document.body.appendChild(this.root)   
    }

}


