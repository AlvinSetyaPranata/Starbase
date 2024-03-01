import { VDomNodes } from "../../app/Core/Renderer.js"

export class Button extends VDomNodes {
    constructor(props) {
        super('button', props)
    }



    structure() {
        return `Klick`
    }
}

