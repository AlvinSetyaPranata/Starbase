import { Link } from "./components/Link.js"


const root = document.getElementById("STARBASE_APP")
const link = new Link()

link.compile()

link.render(root)