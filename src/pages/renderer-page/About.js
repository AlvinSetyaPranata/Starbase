import {VDomNodes} from "../../../app/Core/Renderer.js"

export default class About  extends VDomNodes{
    constructor() {
        super("div", {})
    }

    structure() {
        return `
            <h1>About</h1>
            <button>Hello</button>
        `
    }
}