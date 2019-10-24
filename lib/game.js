COMPANY_URL = `${BASE_URL}/companies`

const diceBoard = document.querySelector('#dice')

/////Rolling the dice//////

const handleDiceRoll = () => {
    const h2 = document.querySelector("#enable-dice");
    // const p = document.querySelector("#roll")
    // p.innerText = ""
    const diceResult = `${rollDice()}`;
    h2.innerText = diceResult;
    diceBoard.removeEventListener("click", noHover())
    handleMovePlayer(diceResult)
}

const rollDice = () => {
    const result = Math.floor( Math.random() * 12 ) + 1
    return result
}

const noHover = () => {
    diceBoard.className = "noHover"
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
    if (current_player_id == 2) {
        current_player_id = 3;
        //Send a patch request to the Game to update this
        return document.querySelector('#player2');
    } else {
        current_player_id = 2;
        //Send a patch request to the Game to update this
        return document.querySelector("#player3");
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

//////Handling the player options////////

const handlePlayerOptions = (newTile) => {
    if (newTile.id) {
        API.get(`${COMPANY_URL}/${newTile.id}`)
        .then(companyData => displayPlayerOptions(companyData))
    } else {
        //Leaving this space for non company cards
        console.log("No company")
    }
}

const displayPlayerOptions = (companyData) => {
    if (companyData.player.name == "Bank") {
        displayButtonsFor.buyCompany(companyData)
    } else if (companyData.player.id == current_player_id){
        displayButtonsFor.upgradeCompany(companyData)
    } else {
        displayButtonsFor.payForServices(companyData)
    }
}

const buyCompanyEvent = (companyData) => {
    API.get(`${PLAYER_URL}/${current_player_id}`)
    .then(userData => handleCompanyPurchase(userData, companyData))
    //PATCH company with new user_id
    //PATCH owner with new amount of money
    //Update everything in the front end
}

const upgradeCompanyEvent = () => {
    //PATCH the company with a new number of servers
    //PATCH the user with a new amount of money
    //Update the front end to reflect changes
}

const payForServicesEvent = (companyData) => {
    API.get(`${PLAYER_URL}/${current_player_id}`) // <<< REFACTOR INTO A FUNCTION, DRY
    .then(userData => handleServicePayments(userData, companyData))
    //Make user pay rent, or if they can't cover rent, give them options to sell company
    //PATCH the paying user with new amount of money
    //PATCH the rent taking user with new amount of money
    //Update the front end
    
}

const handleCompanyPurchase = (userData, companyData) => {
    debugger;
    let companyPrice = companyData.price;
    let userFunds = userData.money

    const buyBtn = document.querySelector("#buy-company")
    buyBtn.style.visibility = "hidden"

    if (sufficientFunds(companyPrice, userFunds)) {
        console.log("Buy company?")
        patchCompany(companyData, userData)
        patchUser(userData, companyData, "CompanyPurchased")
        // update frontEnd -> Change color of tile and the money for user
    } else {
        console.log("You broke mofo!!!")
    }
}

const handleServicePayments = (userData, companyData) => {
    let servicePrice = companyData.price * 0.1
    let userFunds = userData.money
    if (sufficientFunds(servicePrice, userFunds)) {
        patchUser(userData, companyData, "ServicePurchased")
        .then(() => patchUser(userData, companyData, "ServiceProvided"))
    } else {
        console.log("sell yo crib")
    }
}

// Helper method

const sufficientFunds = (charge, userFunds) => {
    if (userFunds > charge) {
        return true;
    } else {
        return false;
    }
}

const patchCompany = (companyData, userData) => {
    companyData.player = userData
    API.update(`${COMPANY_URL}/${companyData.id}`, companyData)
}

const patchUser = (userData, companyData, type) => {
    let newUserData = modifyUserData(userData, companyData, type)
    return API.update(`${PLAYER_URL}/${userData.id}`, newUserData)
}

const modifyUserData = (userData, companyData, type) => {
    let newUserData = ""
    if (type == "CompanyPurchase"){
        userData.money -= companyData.price
        newUserData = userData
    } else if (type = "ServiceUsed") {
        userData.money -= (companyData.price * 0.1)
        newUserData = userData
    } else if (type ="ServiceProvided") {
        companyData.player.money = companyData.player.money + (companyData.price * 0.1)
        newUserData = companyData.player
    }
    return newUserData
}