import { VDomNodes } from "../../../app/Core/Renderer.js";
import { Navigate } from "../../../app/Router/Navigate.js";
import { Button } from "../../components/Button.js";
import { changeTitle } from "../../../app/Utils/modules.js";
export default class Home extends VDomNodes {
    constructor() {
        super('div', {class : "paragraf"})

        this.state = 0
        this.button = new Button({onclick: () => this.setState(this.state + 1)})
        this.link = new Button({onclick: () => Navigate("/about")})

    }
    
    
    afterLoad() {
        changeTitle("Startbase - Home")
    }

    structure() {
        return `
            <div class="container">
                <div class="wrapper">
                    <h1>Youkoso to Starbase!</h1>
                    <h3>Not Elegant But Valuable</h3>

                    <div class="content">
                        ${this.link.render_as_string()}
                    </div>
                </div>
            </div>

        `
    }
}


