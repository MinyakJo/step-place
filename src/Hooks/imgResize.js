const imgResize = (src, {...options}) => {
    const image = new Image();
    image.src = src
    image.crossOrigin = 'Anonymous'

    let canvas = document.createElement("canvas")
    const context = canvas.getContext('2d')
    canvas.width = options.width
    canvas.height = options.height
    canvas.backgroundColor = 'transparent'
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, options.width, options.height)  

    return canvas.toDataURL()
}

export { imgResize }