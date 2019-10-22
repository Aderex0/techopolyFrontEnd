const diceBoard = document.querySelector('#dice')

const handleDiceRoll = () => {
    const h2 = document.querySelector("#enable-dice");
    const p = document.querySelector("#roll")
    p.innerText = ""
    const diceResult = `${rollDice()}`;
    debugger;
    h2.innerText = diceResult;
    handleMovePlayer(diceResult)
}

diceBoard.addEventListener("click", handleDiceRoll)

const handleMovePlayer = (diceResult) => {
    let player = document.querySelector("#player1")
    let currentTile = player.parentNode
    let currentPosition= currentTile.getAttribute("data-id")
    let newPosition = findNewPosition(currentPosition, diceResult)
    
    movePlayerIcon(player, currentTile, newPosition);
    createInteractiveButtons()
}

const findNewPosition = (currentPosition, diceResult) => {
    let newPosition = (parseInt(currentPosition, 10) + parseInt(diceResult, 10)) % 32
    if (newPosition == 0) {
        return 1;
    } else {
        return newPosition;
    }
}

const movePlayerIcon = (player, currentTile, newPosition) => {
    const newDataIdDiv = document.querySelector(`[data-id='${newPosition}']`)
    currentTile.removeChild(player)
    newDataIdDiv.appendChild(player)
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

const rollDice = () => {
    let result = Math.floor( Math.random() * 12 ) + 1
    return result
}

//Initialize Game

const initializeGame = () => {
    getPlayers(GAME_URL);
}



const startBtn = document.querySelector("#start-btn")
startBtn.addEventListener("click", () => {
    diceBoard.id = "enable-dice"
    initializeGame()
    startBtn.disabled = true
})