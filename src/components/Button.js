import { Navigate } from "../../app/Router/Navigate.js"

class Button extends HTMLElement {
    constructor() {
        super()
        this.path = ""
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
        Navigate(this.path)
    }
    
    connectedCallback() {
        this.path = this.getAttribute("path")
        this.render()
    }

    render() {
        this.innerHTML = `
            <button>Klik</button>
        `
        this.querySelector("button").addEventListener("click", this.handleClick)
    }
}

customElements.define("button-component", Button)