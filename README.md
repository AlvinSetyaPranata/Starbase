# Starbase

Starbase, is stands-for starter base library which helps developers to create a website that can support SPA ( Single Page Application )

* **Simplex** Simple but complex, starbase is simple to use that can handle a complext UI structure, this helps developer maintains their UI more easily
* **Cross Frameworks** you can use starbase accross all frameworks, just simply put it in your js folder that is inside your static folder
* **NEBV** (Not-Elegant-But-Valuable), startbase for everyone especially for developers who still want to use vanilla JS as their frontend but want to have a advanced features


## Installation

**NOTE:** 
This library requires server to make it works

- Just simply clone this library and put it inside of your static folder
- Configure your server to listen to the **\*** this will prevent the page from being re-request to the server, because it's already handled by starbase router

## Examples

first it to make a folder called components inside your src folder, dont modify the code that already commented inside the main.js!

**src/components/Button.js**
```
import { VDomNodes } from "../../app/Core/Renderer.js"

export class Button extends VDomNodes {
    constructor(props) {
        super('button', props)
    }



    structure() {
        return `Klick`
    }
}

```

and then we need a simple page component
**src/pages/Home.js**
```
import { VDomNodes } from "../../../app/Core/Renderer.js";
import { Navigate } from "../../../app/Router/Navigate.js";
import { Button } from "../../components/Button.js";

export default class Home extends VDomNodes {
    constructor() {
        super('div', {class : "paragraf"})

        this.state = 0
        this.button = new Button({onclick: () => this.setState(this.state + 1)})
        this.link = new Button({onclick: () => Navigate("/about")})
    }

    structure() {
        return `
            <h1>Home</h1>
            ${this.button.render_as_string()}
            <p>You called the button, ${this.state} times</p>
            <p>Go to other page</p>
            ${this.link.render_as_string()}

        `
    }
}
```

Dont forget to load the javascript inside the index.html file
```
<body>
    <script src="./src/main.js" type="module"></script>
</body>
```

and run the server you should see the first page of starbase app, Omedetto ^-^p

## Contributing
Our commitment is to ensure that developers don't ignore how imporatant we need to learn about fundamental javascript, many people jump in to high level framework without knowing the core languange where the frameworks built on top of it, so we create this library that help people can still built a webpage that have SPA, component-based, and still use vanillaJS. we are gratefull to all contributors that reporting bug, bugfixes, and improving this library. happy coding nii-chan ^-^

