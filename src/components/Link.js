import { Component } from "../../app/Core/Renderer.js";


export class Link extends Component {
    constructor() {
        super("div", {class: "container"})
    }


    structure() {
        return `Hello worlds`
    }
}
