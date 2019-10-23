const centerBoard = document.querySelector("#center-board");

let makeSquareDiv = (i) => {
    let position = ""
    if (i < 11) {
        let gridColStart = 17
        gridColStart = gridColStart + 14 * i
        position = `2 / ${gridColStart} / span 16 / span 14`
        return position
    } else if (i === 11) {
        return position = "2 / 171 / span 32 / span 28"
    } else if (i === 12) {
        return position = "19 / 157 / span 15 / span 14 "
    } else if (i > 12 && i < 16) {
        let gridRowStart = 18
        gridRowStart = gridRowStart + 16 * (i - 12);
        position = `${gridRowStart} / 157 / span 16 / span 14`;
        return position
    } else if (i > 15 && i < 18) {
        let gridColStart = 157
        gridColStart = gridColStart - 14 * (i - 15);
        position = `66 / ${gridColStart} / span 16 / span 14`;
        return position
    } else if (i > 17 && i < 20) {
        let gridRowStart = 66
        gridRowStart = gridRowStart - 16 * (i - 17)
        position = `${gridRowStart} / 129 / span 16 / span 14`
        return position
    } else if (i > 19 && i < 22) {
        let gridColStart = 129
        gridColStart = gridColStart - 14 * (i - 19)
        position = `34 / ${gridColStart} / span 16 / span 14`
        return position
    } else if (i > 21 && i < 24) {
        let gridRowStart = 34
        gridRowStart = gridRowStart + 16 * (i - 21)
        position = `${gridRowStart} / 101 / span 16 / span 14`
        return position
    } else if (i > 23 && i < 29) {
        let gridColStart = 101
        gridColStart = gridColStart - 14 * (i - 23)
        position = `66 / ${gridColStart} / span 16 / span 14`
        return position
    } else if (i === 29) {
        return position = "50 / 3 / span 32 / span 28"
    } else if (i === 30) {
        return position = "50 / 31 / span 15 / span 14"
    } else if (i === 31 || i === 32) {
        let gridRowStart = 50
        gridRowStart = gridRowStart - 16 * (i - 30)
        position = `${gridRowStart} / 31 / span 16 / span 14 `
        return position
    }
}

const createBoardSquares = () => {
    let i = 1
    while (i < 33) {
        const boardSquareDiv = document.createElement("div");
        boardSquareDiv.setAttribute('data-id',`${i}`)
        boardSquareDiv.style.gridArea = `${makeSquareDiv(i)}`
        boardSquareDiv.style.backgroundColor = "red"
        boardSquareDiv.style.border = "1px yellow solid"
        boardSquareDiv.style.display = "inline-block"
        centerBoard.appendChild(boardSquareDiv)
        i++
    }
}

const createGrid = (yAxis, xAxis) => {
    centerBoard.style.gridTemplateColumns = yAxis
    centerBoard.style.gridTemplateRows = xAxis
    createBoardSquares()
}

const matchScreenRes = resolutionChange => {
    if (resolutionChange.matches) {
        yAxis = "repeat(300, 1fr)"
        xAxis = "repeat(126, 1fr)"
        createGrid(yAxis, xAxis)
    } else {
        yAxis = "repeat(200, 1fr)"
        xAxis = "repeat(84, 1fr)"
        createGrid(yAxis, xAxis)
    }
}

const runGameBoard = () => {
    let resolutionChange = window.matchMedia("(min-width: 1920px")
    matchScreenRes(resolutionChange)
    resolutionChange.addListener(matchScreenRes)
}

runGameBoard()