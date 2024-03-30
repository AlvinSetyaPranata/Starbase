import { Component } from "../../app/Core/Renderer.js";


export class Link extends Component {
    constructor() {
        super("button", {class: "container", onclick: () => alert("Hello worlds")})
    }


    structure() {
        return "This is a button"
    }
}
