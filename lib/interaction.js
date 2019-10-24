const interactionsContainer = document.querySelector("#interactions-container")

const createInteractiveButtons = () => {
    interactionsContainer.innerText = ""

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
    })

    const giveUp = document.createElement("button")
    giveUp.id = "give-up"
    giveUp.className = "int-buttons"
    giveUp.innerText = "Give up!"

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
    payBtn.innerText = "Pay up bitch!"
    payBtn.style.visibility = "hidden"

    interactionsContainer.append(endTurnBtn, giveUp, buyCompany, payService, sellCompany, buyServer, payBtn)
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
    payBtn.style.visibility = "visible"

    payBtn.addEventListener("click", () => payForServicesEvent(userData, companyData))
}

const displayButtonsFor = {
    buyCompany,
    upgradeCompany,
    payForServices
}

