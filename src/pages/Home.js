import "../components/Button.js"

export default class Home {
    constructor() {

    }
    render() {
        return `
            <h1>Home</h1>
            <button-component path="/about"></button-component>
        `
    }
}