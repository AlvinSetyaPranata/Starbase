export default class Router {
    constructor(routes, parent) {
        this.routes = routes;
        this.mode = "url";
        this.parent = parent;
        this.init();
    }

    setMode(mode) {
        return this.mode = mode;
    }

    async init() {
        window.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                history.pushState("", "", e.target.dataset.link);
                this.handleRoute();
            }
        });

        window.addEventListener("popstate", () => this.handleRoute(), {passive: true});
        window.addEventListener("hashchange", () => this.handleRoute(), {passive: true});
        window.addEventListener("DOMContentLoaded", () => this.handleRoute(), {passive: true});
        window.addEventListener("beforeunload", () => this.handleRoute(), {passive: true});
    }

    async handleRoute() {
        console.log("Hello");

        let url = window.location.hash;

        if(url.length == 0) url = "#";

        let path = this.mode == "url" ? this.routes[window.location.pathname] : this.routes[url];

        Object.keys(this.routes).forEach(routePath => {
            const regex = new RegExp("^" + routePath.replace(/:\w+/g, "(.+)") + "$");
            const match = this.mode == "url" ? location.pathname.match(regex) : url.match(regex);

            if (match) {
                const params = match.slice(1);
                const id = params[0];
                path = this.routes[routePath];
                path.id = id;
            }
        })

        if (path) {
            document.title = path.title ? path.title : "Minibase";
            // document.getElementById("root").innerHTML = await new path.element(path.id).render();            
            await this.parent.render(path.element)
            return;
        }

        this.mode == "url" ? history.replaceState("", "", "/") : history.replaceState("", "", "#");
    }
}
