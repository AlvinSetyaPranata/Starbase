import {VDomNodes} from "../../../app/Core/Renderer.js"
import { Navigate } from "../../../app/Router/Navigate.js"
import { changeTitle } from "../../../app/Utils/modules.js"
import { Button } from "../../components/Button.js"


export default class About extends VDomNodes{
    constructor() {
        super("div", {})
        this.button = new Button({onclick: () => Navigate("/")})

    }
    
    afterLoad() {
        changeTitle("Startbase - About")
    }

    structure() {
        return `
            <h1>About</h1>
           ${this.button.render_as_string()}
        `
    }
}