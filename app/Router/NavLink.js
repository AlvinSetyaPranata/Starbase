import { Navigate } from "../Router/Navigate.js"

export class NavLink extends HTMLElement {
    constructor() {
        super()
        this.path = ""
        this.text = ""
        this.handleNav = this.handleNav.bind(this)
    }

    connectedCallback() {
        this.path = this.getAttribute("to")
        this.text = this.innerText;
        this.render()
    }

    handleNav() {
        Navigate(this.path)
    }

    render() {
        this.innerHTML = `
            <a>${this.text}</a>
        `
        this.querySelector("a").addEventListener("click", this.handleNav)
    }
}

customElements.define("nav-link", NavLink)