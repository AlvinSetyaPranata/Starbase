import { VDomNodes } from "../../app/Core/Renderer.js";
import Card from "../components/Card.js";

export default class Home extends VDomNodes {
    constructor() {
        super('div')
        this.data = [
            {
                title: "Vanilla JS",
                desc: "Purely use native Javascript"
            },

            {
                title: "Builtin Router-DOM",
                desc: "Navigate between page without installing any third party or lib"
            },
            {
                title: "State",
                desc: "Update the state without causing re-render"
            },
            {
                title: "Cross Frameworks",
                desc: "Works accross all frameworks and integrate in a simple way"
            },
            {
                title: "NEBV",
                desc: "Not-Elegant-But-Valuable, learn from down-to-up not up-to-down"
            },
            {
                title: "V-DOM node",
                desc: "Use VirtualDOM to reduce page render"
            }
        ]
    }


    structure() {
        return `
        <div class="container">
            <div class="wrapper">
                <h1>Youkoso to Starbase</h1>
        
                <h3>Get started by editing you main.js file!</h3>
        
                <div class="button">
                    Get started with
                </div>
            </div>
        </div>

        <section class="about">
            <h1>Why Starbase?</h1>
            <div class="features">
                ${this.data.map(({title, desc}) => (
                    new Card(title, desc).render_as_string()
                )).join('')}
            </div>
        </section>
        `
    }
}