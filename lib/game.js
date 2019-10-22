const diceBoard = document.querySelector('#dice')
diceBoard.addEventListener("click", () => {
    const h2 = document.querySelector("h2")
    const diceNumber = `${diceResult()}`

    const p = document.querySelector("#roll")
    p.innerText = ""
    
    h2.innerText = diceNumber
    movePlayer(diceNumber)
})

const movePlayer = diceNumber => {
    let player1 = document.querySelector("#player1")
    let currentPlayerPosition= player1.parentNode
    let dataId = currentPlayerPosition.getAttribute("data-id")
    dataId = (parseInt(dataId, 10) + parseInt(diceNumber, 10)) % 32
    dataId = checkDataId(dataId)
    player1 = document.querySelector("#player1")
    currentPlayerPosition.removeChild(player1)
    const newDataIdDiv = document.querySelector(`[data-id='${dataId}']`)
    newDataIdDiv.appendChild(player1)
    createInteractiveButtons()
}

const checkDataId = dataId => {
    let data = 0
    if (dataId === 0)
        data = 1
    else {
        data = dataId
    }
    return data
}

const diceResult = () => {
    let result = Math.floor( Math.random() * 12 ) + 1
    return result
}

//Initialize Game

const initializeGame = () => {
    const startBlock = document.querySelector("[data-id='1']")

    const player1 = document.createElement("div")
    const player2 = document.createElement("div")
    player1.id = "player1"
    player2.id = "player2"
    startBlock.appendChild(player1)
    startBlock.appendChild(player2)

    const p = document.querySelector("#roll")
    p.innerText = "roll the dice!"
}



const startBtn = document.querySelector("#start-btn")
startBtn.addEventListener("click", () => {
    diceBoard.id = "enable-dice"
    initializeGame()
    startBtn.disabled = true
})