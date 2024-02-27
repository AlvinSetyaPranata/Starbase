// Router tester

// import Router from "../app/Router/RouterHandler.js"
// import Home from "./pages/Home.js"
// import About from "./pages/About.js"
// import Detail from "./pages/Detail.js"

// const routes = {
//     "/": {title: "Home", element: Home},
//     "/about": {title: "about", element: About},
//     "/detail/:id": {title: "detail", element: Detail},
// }

// export const route = new Router(routes)



// Engine tester

import {RootDOM} from "../app/Core/Renderer.js"
import Router from "../app/Router/RouterHandler.js"
import { addTempVar } from "../app/Utils/Cache.js"
import About from "./pages/renderer-page/About.js"
import Home from "./pages/renderer-page/Home.js"

const routes = {
    "/": {title: "Home", element: new Home()},
    "/about": {title: "about", element: new About()},
}


export const app = new RootDOM()
export const route = new Router(routes, app)

