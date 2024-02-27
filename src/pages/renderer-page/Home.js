import { VDomNodes } from "../../../app/Core/Renderer.js";
import { Button } from "../../components/Button.js";

export default class Home extends VDomNodes {
    constructor() {
        super('div', {class : "paragraf"})
        this.button = new Button()
    }

    structure() {
        return `
            <h1>Home</h1>
            ${this.button.render_as_string()}
        `
    }
}


