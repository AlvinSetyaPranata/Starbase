import { Component } from "../../app/Core/Renderer.js";


export class Link extends Component {
    constructor() {
        super("div", {class: "container"})
    }


    structure() {
        return `
        <div class="container" id="parent">
            hello
            <div class="child1">
                <p>Alvin Setya Pranata</p>
            </div>

            This should be on root and between child1 and child2 element
            
            <div class="child2">
                <p>12</p>
            </div>
        </div>
        `
    }
}
