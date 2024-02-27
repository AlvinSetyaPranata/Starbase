import { getTempVar, addTempVar } from "../Utils/Cache.js"
import { generateRandom } from "../Utils/String.js"

addTempVar("_sb_temp_events_", {})


export class VDomNodes {
    constructor(tag_name, attributes) {
        this.state = {}
        this.tag_name = tag_name
        this.attributes = attributes
        this.id = generateRandom(10)
        this.element = document.createElement(this.tag_name)
        this.storage = getTempVar('_sb_temp_events_')
        this.setup()
    }
    

    setup() {
        this.element.setAttribute('data-VDomNodeID', this.id)
        this.storage[this.id] = {}
    }
    
    addListener(key, callback) {
        this.storage[this.id][key] = callback
    }


    // Return node type
    render() {
        // Create a pre-render HTML element
        let children = this.structure()
        
        // Set all user specified attributes to the element
        Object.entries(this.attributes).forEach(([attribute, value]) => {
            this.element.setAttribute(attribute, value)
        })

        // Append all child into element
        this.element.innerHTML = children
        return this.element
    }
    
    // Return node as string
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
        this.registerEvent()
    }

    registerEvent() {
        const nodes = document.querySelectorAll("[data-VDomNodeID]")
        const storage = getTempVar("_sb_temp_events_")


        nodes.forEach(element => {
            const id = element.getAttribute("data-VDomNodeID")

            if (!storage[id]) return

            Object.entries(storage[id]).forEach(([keyEvent, callback]) => {
                element.addEventListener(keyEvent, callback)
            })

            delete storage[id]
        })       
    }

}


// Use trandition event handler