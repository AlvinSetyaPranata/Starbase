import { route } from "../../src/app.js"


export const Navigate = path => {
    history.pushState("", "", path)
    route.handleRoute()
}