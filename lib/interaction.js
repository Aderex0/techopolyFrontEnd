const interactionsContainer = document.querySelector("#interactions-container")
const buttonContainer = document.querySelector("#button-container")

const createInteractiveButtons = () => {
    buttonContainer.innerText = ""

    const endTurnBtn = document.createElement("button")
    endTurnBtn.id = "end-btn"
    endTurnBtn.className = "int-buttons"
    endTurnBtn.innerText = "End turn!"
    endTurnBtn.addEventListener("click", () => {
        if (current_player_id == 2) {
            current_player_id = 3;
        } else {
            current_player_id = 2;
        }
        endTurnBtn.style.visibility = "hidden"

        const buyCompanyBtn = document.querySelector("#buy-company")
        buyCompanyBtn.style.visibility = "hidden"

        diceBoard.addEventListener("click", handleDiceRoll)
        diceBoard.className = "hovered"
        rollResultP.innerText = "roll the dice!"
    })

    const giveUp = document.createElement("button")
    giveUp.id = "give-up"
    giveUp.className = "int-buttons"
    giveUp.innerText = "Give up!"

    giveUp.addEventListener("click", () => {
        API.get(`${PLAYER_URL}/give_up`)
    })

    const buyCompany = document.createElement("button")
    buyCompany.id = "buy-company"
    buyCompany.className = "int-buttons"
    buyCompany.innerText = "Buy company!"
    buyCompany.style.visibility = "hidden"

    const payService = document.createElement("button")
    payService.id = "pay-service"
    payService.className = "int-buttons"
    payService.innerText = "Pay service!"
    payService.style.visibility = "hidden"

    const sellCompany = document.createElement("button")
    sellCompany.id = "sell-company"
    sellCompany.className = "int-buttons"
    sellCompany.innerText = "Sell company!"
    sellCompany.style.visibility = "hidden"

    const buyServer = document.createElement("button")
    buyServer.id = "buy-server"
    buyServer.className = "int-buttons"
    buyServer.innerText = "Buy server!"
    buyServer.style.visibility = "hidden"

    const payBtn = document.createElement("button")
    payBtn.id = "pay-services"
    payBtn.className = "int-buttons"
    payBtn.innerText = "Pay for services"
    payBtn.style.visibility = "hidden"

    buttonContainer.append(endTurnBtn, giveUp, buyCompany, payService, sellCompany, buyServer, payBtn)
}

const buyCompany = (companyData) => {
    const buyBtn = document.querySelector("#buy-company")
    buyBtn.style.visibility = "visible"
 
    buyBtn.addEventListener("click", () => buyCompanyEvent(companyData))
}

const upgradeCompany = () => {
    console.log("Upgrade company?")
}

const payForServices = (userData, companyData) => {
    const payBtn = document.querySelector("#pay-services")
    const endBtn = document.querySelector("#end-btn")
    
    payBtn.style.visibility = "visible"
    endBtn.style.visibility = "hidden"

    payBtn.addEventListener("click", () => payForServicesEvent(userData, companyData))
}

const displayButtonsFor = {
    buyCompany,
    upgradeCompany,
    payForServices
}

