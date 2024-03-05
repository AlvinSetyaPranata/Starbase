import "../../components/Button.js"

export default class Detail {
    constructor(id) {
        this.id = id
    }
    render() {
        return `
            <h1>Detail id: ${this.id}</h1>
            <button-component path="/"></button-component>
        `
    }
}