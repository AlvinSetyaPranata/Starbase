import {RootDOM} from "../app/Core/Renderer.js"
import Router from "../app/Router/RouterHandler.js"
import Home from "./pages/Home.js"

const routes = {
    "/": {title: "Homes", element: new Home()}
}

// Don't modify code bellow !
export const root = new RootDOM()
export const route = new Router(routes, root)

