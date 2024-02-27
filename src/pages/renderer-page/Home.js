import { VDomNodes } from "../../../app/Core/Renderer.js";

export default class Home extends VDomNodes {
    constructor() {
        super('div', {class : "paragraf"})
        this.data = ["Alvin", "ALvin2"]
    }

    structure() {
        return `
            <h1>Home</h1>
            ${this.data.map((d) => `<p>${d}</p>`).join('')}
        `
    }
}


