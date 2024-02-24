export default class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    async init() {
        this.routes = await this.routes
        window.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                history.pushState("", "", e.target.dataset.link);
                this.handleRoute();
            }
        });

        window.addEventListener("popstate", () => this.handleRoute());
        window.addEventListener("DOMContentLoaded", () => this.handleRoute());
        window.addEventListener("beforeunload", () => this.handleRoute())
    }

    async handleRoute() {
        let path = this.routes[window.location.pathname];

        Object.keys(this.routes).forEach(routePath => {
            const regex = new RegExp("^" + routePath.replace(/:\w+/g, "(.+)") + "$")
            const match = location.pathname.match(regex)
            if (match) {
                const params = match.slice(1)
                const id = params[0]
                path = this.routes[routePath]
                path.id = id
            }
        })
    
        if (path) {
            document.title = path.title ? path.title : "Minibase";
            document.getElementById("root").innerHTML = await new path.element(path.id).render();
            return;
        }

        history.replaceState("", "", "/");
    }
}
