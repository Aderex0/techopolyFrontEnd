COMPANY_URL = `${BASE_URL}/companies`

const diceBoard = document.querySelector('#dice')

/////Rolling the dice//////

const handleDiceRoll = () => {
    const h2 = document.querySelector("#enable-dice");
    // const p = document.querySelector("#roll")
    // p.innerText = ""
    const diceResult = `${rollDice()}`;
    h2.innerText = diceResult;
    handleMovePlayer(diceResult)
}

const rollDice = () => {
    const result = Math.floor( Math.random() * 12 ) + 1
    return result
}

diceBoard.addEventListener("click", handleDiceRoll)

//////Moving the players///////

const handleMovePlayer = (diceResult) => {
    let player = selectPlayer();
    //Needs to be connected to the game model
    let currentTile = player.parentNode
    let currentPosition= currentTile.getAttribute("data-id")
    let newPosition = getNewPosition(currentPosition, diceResult)
    let newTile = movePlayerIcon(player, currentTile, newPosition);

    handlePlayerOptions(newTile)
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

//////Handling the player options/////////

const handlePlayerOptions = (newTile) => {
    if (newTile.id) {
        API.get(`${COMPANY_URL}/${newTile.id}`)
        .then(data => companyOptions(data))
    } else {
        //Leaving this space for non company cards
        console.log("No company")
    }
}

const companyOptions = (data) => {
    if (data.player.name == "Bank") {
        displayOptions.buyCompany(data)

        //PATCH company with new user_id
        //PATCH owner with new amount of money
        //PATCH buyer with new amount of money
        //Update everything in the front end
    } else if (data.player.id == current_player_id){
        displayOptions.upgradeCompany()

        //Display options for user to update the company
        //PATCH the company with a new number of servers
        //PATCH the user with a new amount of money
        //Update the front end to reflect changes
    } else {
        displayOptions.payForServices(data)
        //Make user pay rent, or if they can't cover rent, give them options to sell company
        //PATCH the paying user with new amount of money
        //PATCH the rent taking user with new amount of money
        //Update the front end
    }
}

const buyCompanyEvent = () => {

}

const updgradeCompanyEvent = () => {

}

const payForServicesEvent = () => {

}