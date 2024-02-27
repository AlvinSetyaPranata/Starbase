import { VDomNodes } from "../../../app/Core/Renderer.js";

export default class Home extends VDomNodes {
    constructor() {
        super('div', {"class" : "paragraf"})
    }

    structure() {
        return `
            <h1>Home</h1>
            <button>Hello</button>
        `
    }
}


