import { Component } from "../../app/Core/Renderer.js";


export class Link extends Component {
    constructor() {
        super("div", {class: "container"})
    }


    structure() {
        return `
        <div>
            <p>Hello me</p>
            <div>
                <p>Hello you</p>
            </div>
                <input type='text' />
        </div>`
    }
}
