export class VDomNodes {
    constructor(tag_name, attributes) {
        this.state = {}
        this.events = {}
        this.tag_name = tag_name
        this.attributes = attributes
        this.element = document.createElement(this.tag_name)
    }


    render() {
        // Create a pre-render HTML element
        let children = this.structure()

        // Set all user specified attributes to the element
        Object.entries(this.attributes).forEach(([attribute, value]) => {
            this.element.setAttribute(attribute, value)
        })


        Object.entries(this.events).forEach(([key, callback]) => {
            this.element.addEventListener(key, callback)
        })

        // Append all child into element
        this.element.innerHTML = children
        return this.element
    }


    render_as_string() {
        this.render()
        return this.element.outerHTML.trim()
    }


    // This method should be override by the user
    structure() {}

}



export class RootDOM {
    constructor() {
        this.root = document.createElement("div")
        this.root.setAttribute("id", "STARBASE_APP")
    }

    render(node) {
        this.root.appendChild(node.render())
        document.body.appendChild(this.root)   
    }

}


