COMPANY_URL = `${BASE_URL}/companies`
PLAYER_URL = `${BASE_URL}/players`

const fundingRounds = [11, 29];
const randomTiles = [1, 2, 7, 8, 9, 13, 16, 19, 20, 21, 23, 24, 27, 30];

const diceBoard = document.querySelector('#dice')

/////Rolling the dice//////

const handleDiceRoll = () => {
    const h2 = document.querySelector("#enable-dice");
    const diceResult = `${rollDice()}`;
    rollResultP.innerText = diceResult
    diceBoard.removeEventListener("click", noHover())
    handleMovePlayer(diceResult)
}

const rollDice = () => {
    const result = Math.floor( Math.random() * 12 ) + 1
    // result = 10
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
        //Send a patch request to the Game to update this
        return document.querySelector('#player2');
    } else {
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
    if (fundingRounds.includes(parseInt(newTile.getAttribute("data-id")))) {
        handleFundingRoundEvent()
        console.log("money!!!")
    } else if (randomTiles.includes(parseInt(newTile.getAttribute("data-id")))) {
        ////Create a random event
        console.log("Random")
    } else {
        API.get(`${COMPANY_URL}/${newTile.id}`)
        .then(companyData => displayPlayerOptions(companyData))
        //Leaving this space for non company cards
        console.log("No company")
    }
}

const handleFundingRoundEvent = () => {
    return fetch(`http://localhost:3000/players/${current_player_id}`)
    .then(resp => resp.json())
    .then(playerData => increaseCompanyValue(playerData))
}

const increaseCompanyValue = (playerData) => {
    for (let i=0; i<playerData.companies.length; i++) {
        playerData.companies[i].price *= 1.25 /// Make this random
    }
    createPostRequests(playerData)
}

const createPostRequests = (playerData) => {
    playerData.companies.forEach(company => {
        postCompanyPrice(company)
    })
}

const postCompanyPrice = (company) => {
    //This works in a flash, if I put a debugger and smash through it! Why??!
    API.post(`${COMPANY_URL}/funding_round`, company)
    .then(companyData => renderNewCompanyPrice(companyData))
    // .then(() => setTimeout(console.log("Hello"), 1000))
}

const renderNewCompanyPrice = (companyData) => {
    let companyTile = document.querySelector(`div[id="${companyData.id}"]`)
    let money = companyTile.children[1]
    money.textContent = `£${companyData.price}`
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
    .then(playerData => handleCompanyPurchase(playerData, companyData))
}

const payForServicesEvent = (companyData) => {
    API.get(`${PLAYER_URL}/${current_player_id}`)
    .then(playerData => handleServicePayments(playerData, companyData))
}

const handleCompanyPurchase = (playerData, companyData) => {
    let companyPrice = companyData.price;
    let userFunds = playerData.money

    const buyBtn = document.querySelector("#buy-company")
    buyBtn.style.visibility = "hidden"

    if (sufficientFunds(companyPrice, userFunds)) {
        console.log("Buy company?")
        patchCompany(companyData, playerData)
        patchUser(playerData, companyData, "CompanyPurchased")
        // update frontEnd -> Change color of tile and the money for user
        applyUserColorFrame(playerData)
    } else {
        console.log("You broke mofo!!!")
    }
}

const applyUserColorFrame = playerData => {
    const userId = playerData.id 
    const findUserIcon = document.querySelector(`#player${userId}`)
    const companySquare = findUserIcon.parentNode
    companySquare.style.backgroundColor = "red"
}

const handleServicePayments = (playerData, companyData) => {
    debugger;
    let servicePrice = companyData.price * 0.1
    let userFunds = playerData.money
    if (sufficientFunds(servicePrice, userFunds)) {
        patchUser(playerData, companyData, "ServicePurchased")
        .then(() => patchUser(playerData, companyData, "ServiceProvided"))
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

const patchCompany = (companyData, playerData) => {
    companyData.player = playerData
    API.update(`${COMPANY_URL}/${companyData.id}`, companyData)
}

const patchUser = (playerData, companyData, type) => {
    debugger;
    let newplayerData = modifyplayerData(playerData, companyData, type)
    let user_id = getUserId(playerData, companyData, type)
    return API.update(`${PLAYER_URL}/${user_id}`, newplayerData)
    .then(playerData => updateDOM(playerData))
 }

const modifyplayerData = (playerData, companyData, type) => {
    let newplayerData = ""
    if (type == "CompanyPurchase"){
        playerData.money -= companyData.price
        newplayerData = playerData
    } else if (type == "ServicePurchased") {
        playerData.money -= (companyData.price * 0.1)
        newplayerData = playerData
    } else {
        companyData.player.money += (companyData.price * 0.1)
        newplayerData = companyData.player
    }
    return newplayerData
}

const getUserId = (playerData, companyData, type) => {
    if (type == "CompanyPurchased" || type == "ServicePurchased") {
        return playerData.id
    } else {
        return companyData.player.id
    }
}

const updateDOM = (playerData) => {
    let money = document.querySelector(`p[id="${playerData.id}"]`)
    money.textContent = `Money: $${playerData.money}`
}