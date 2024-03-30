import { VDomNodes } from "../../app/Core/Renderer.js";



export default class Card extends VDomNodes {
    constructor(title, desc) {
        super('div', {class: "card"})
        this.title = title
        this.desc = desc
    }


    structure() {
        return `
            <h4>${this.title}</h4>
            <p>${this.desc}</p> 
        `
    }
}