import {VDomNodes} from "../../../app/Core/Renderer.js"
import { Button } from "../../components/Button.js"

export default class About extends VDomNodes{
    constructor() {
        super('div', {class : "paragraf"})

        this.state = 0
        this.button = new Button({"onclick" : () => this.setState(this.state + 1)})
    }

    structure() {
        return `
            <h1>About</h1>
            <a data-link="/about">To About</a>
        `
    }
}