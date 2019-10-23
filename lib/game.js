COMPANY_URL = `${BASE_URL}/companies`

const diceBoard = document.querySelector('#dice')

const handleDiceRoll = () => {
    const h2 = document.querySelector("#enable-dice");
    // const p = document.querySelector("#roll")
    // p.innerText = ""
    const diceResult = `${rollDice()}`;
    h2.innerText = diceResult;
    handleMovePlayer(diceResult)
}

diceBoard.addEventListener("click", handleDiceRoll)

const handleMovePlayer = (diceResult) => {
    let player = selectPlayer();
    //Needs to be connected to the game model
    let currentTile = player.parentNode
    let currentPosition= currentTile.getAttribute("data-id")
    let newPosition = getNewPosition(currentPosition, diceResult)
    let newTile = movePlayerIcon(player, currentTile, newPosition);

    handlePlayerOptions(player, newTile)
    createInteractiveButtons()
}

const selectPlayer = () => {
    if (current_player_id == 1) {
        current_player_id = 2;
        //Send a patch request to the Game to update this
        return document.querySelector('#player1');
    } else {
        current_player_id = 1;
        //Send a patch request to the Game to update this
        return document.querySelector("#player2");
    }
}

const getNewPosition = (currentPosition, diceResult) => {
    let newPosition = (parseInt(currentPosition, 10) + parseInt(diceResult, 10)) % 32
    if (newPosition == 0) {
        return 1;
    } else {
        return newPosition;
    }
}

const movePlayerIcon = (player, currentTile, newPosition) => {
    const newTile = document.querySelector(`[data-id='${newPosition}']`)
    currentTile.removeChild(player)
    newTile.appendChild(player)
    return newTile
}

const rollDice = () => {
    let result = Math.floor( Math.random() * 12 ) + 1
    return result
}

const handlePlayerOptions = (currentTile) => {
    if (currentTile.id) {
        API.get(`${COMPANY_URL}/${currentTile.id}`)
        .then(data => companyOptions(data))
    } else {
        console.log("No company")
    }
}

const companyOption = (data) => {
    if (data.owner.name == "BANK") {
        //Display options for user to buy the company ++ Skip turn
        //Redirect to patch methods for 
    } else if (data.owner.id == current_player_id){ 
        //Display options for user to update the company ++ skip the turn
    } else {
        //Make user pay rent, or if they can't cover rent, give them options to sell company
    }
}
//Initialize Game

const initializeGame = () => {
    getPlayers(GAME_URL);
    getCompanies();
}


const startBtn = document.querySelector("#start-btn")
startBtn.addEventListener("click", () => {
    diceBoard.id = "enable-dice"
    initializeGame()
    startBtn.disabled = true
})