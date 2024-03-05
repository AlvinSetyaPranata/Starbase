export function includeStyle(path) {
    const linkElement = document.createElement(`<link rel="stylesheet" href="${path}">`)
    document.head.appendChild(linkElement)
}


export function changeTitle(text) {
    document.title = text
}


export function metaData() {
    const metaElement = document.createElement(`<meta>`)
}