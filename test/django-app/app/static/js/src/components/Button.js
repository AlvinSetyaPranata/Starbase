import { VDomNodes } from "../../app/Core/Renderer.js"
// import { Navigate } from "../../app/Router/Navigate.js"

export class Button extends VDomNodes {
    constructor(props) {
        super('button', props)
        // this.addListener('click', () => this.setState(this.state + 1))
    }



    structure() {
        return `Klick`
        // this.querySelector("button").addEventListener("click", this.handleClick)
    }
}

