import { VDomNodes } from "../../../app/Core/Renderer.js";
import { Button } from "../../components/Button.js";

export default class Home extends VDomNodes {
    constructor() {
        super('div', {class : "paragraf"})

        this.state = 0
        this.button = new Button({"onclick" : () => this.setState(this.state + 1)})
    }

    structure() {
        return `
            <h1>Home</h1>
            ${this.button.render_as_string()}
            <p>You called the button, ${this.state} times</p>
            <a data-link="/about">To About</a>
        `
    }
}


