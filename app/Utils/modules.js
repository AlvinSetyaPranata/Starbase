export function changeTitle(text) {
    document.title = text
}


export function metaData(metaProps) {
    const metaElement = document.createElement(`<meta>`)

    Object.entries(metaProps).map(([name, value]) => {
        metaElement.setAttribute(name, value)
    })

    document.head.appendChild(metaElement)
}