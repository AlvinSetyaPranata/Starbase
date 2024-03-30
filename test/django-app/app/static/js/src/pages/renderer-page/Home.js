import { VDomNodes } from "../../../app/Core/Renderer.js";
import { Navigate } from "../../../app/Router/Navigate.js";
import { Button } from "../../components/Button.js";

export default class Home extends VDomNodes {
    constructor() {
        super('div', {class : "paragraf"})

        this.state = 0
        this.button = new Button({onclick: () => this.setState(this.state + 1)})
        this.link = new Button({onclick: () => Navigate("/about")})
    }

    structure() {
        return `
            <h1>Home</h1>
            ${this.button.render_as_string()}
            <p>You called the button, ${this.state} times</p>
            <p>Go to other page</p>
            ${this.link.render_as_string()}

        `
    }
}


