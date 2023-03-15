const firePixels = []
const fireWidth = 50
const fireHeight = 50
const fireColorsPalette = [
    { "b": 7, "g": 7, "r": 7 },
    { "b": 31, "g": 7, "r": 7 },
    { "b": 47, "g": 15, "r": 7 },
    { "b": 71, "g": 15, "r": 7 },
    { "b": 87, "g": 23, "r": 7 },
    { "b": 103, "g": 31, "r": 7 },
    { "b": 119, "g": 31, "r": 7 },
    { "b": 143, "g": 39, "r": 7 },
    { "b": 159, "g": 47, "r": 7 },
    { "b": 175, "g": 63, "r": 7 },
    { "b": 191, "g": 71, "r": 7 },
    { "b": 199, "g": 71, "r": 7 },
    { "b": 223, "g": 79, "r": 7 },
    { "b": 223, "g": 87, "r": 7 },
    { "b": 223, "g": 87, "r": 7 },
    { "b": 215, "g": 95, "r": 7 },
    { "b": 215, "g": 95, "r": 7 },
    { "b": 215, "g": 103, "r": 15 },
    { "b": 207, "g": 111, "r": 15 },
    { "b": 207, "g": 119, "r": 15 },
    { "b": 207, "g": 127, "r": 15 },
    { "b": 207, "g": 135, "r": 23 },
    { "b": 199, "g": 135, "r": 23 },
    { "b": 199, "g": 143, "r": 23 },
    { "b": 199, "g": 151, "r": 31 },
    { "b": 191, "g": 159, "r": 31 },
    { "b": 191, "g": 159, "r": 31 },
    { "b": 191, "g": 167, "r": 39 },
    { "b": 191, "g": 167, "r": 39 },
    { "b": 191, "g": 175, "r": 47 },
    { "b": 183, "g": 175, "r": 47 },
    { "b": 183, "g": 183, "r": 47 },
    { "b": 183, "g": 183, "r": 55 },
    { "b": 207, "g": 207, "r": 111 },
    { "b": 223, "g": 223, "r": 159 },
    { "b": 239, "g": 239, "r": 199 },
    { "b": 255, "g": 255, "r": 255 }]

function start() {
    createFireDataStructure()
    createFireSource()

    setInterval(calculateFirePropagation, 30)
}

function createFireDataStructure() {
    const pixels = fireWidth * fireHeight
    for (let i = 0; i < pixels; i++) {
        firePixels[i] = 0
    }
}

function calculateFirePropagation() {
    for (let column = 0; column < fireHeight; column++) {
        for (let row = 0; row < fireWidth; row++) {
            const pixelIndex = column + (fireWidth * row)

            updateFireIntensity(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensity(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireHeight * fireHeight) {
        return
    }
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixels[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixels[currentPixelIndex - decay] = newFireIntensity
}

function renderFire() {
    const debug = false
    let html = '<table>'

    for (let row = 0; row < fireWidth; row++) {
        html += '<tr>'

        for (let column = 0; column < fireHeight; column++) {
            const pixelIndex = column + (fireWidth * row)
            const fireIntensity = firePixels[pixelIndex]

            if (debug === true) {
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            } else {
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.b}, ${color.g}, ${color.r}`
                html += `<td style="background-color: rgb(${colorString})" ></td>`
            }

        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column < fireWidth; column++) {
        const overFlowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overFlowPixelIndex - fireWidth) + column

        firePixels[pixelIndex] = 36
    }
}

start()