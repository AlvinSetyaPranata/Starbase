import { VDomNodes } from "../../app/Core/Renderer.js"
// import { Navigate } from "../../app/Router/Navigate.js"

export class Button extends VDomNodes {
    constructor() {
        super('button', {})
        this.addListener('click', () => alert("Hello"))
    }



    structure() {
        return 'Klick'
        // this.querySelector("button").addEventListener("click", this.handleClick)
    }
}

