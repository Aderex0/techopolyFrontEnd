const interactionsContainer = document.querySelector("#interactions-container")

const createInteractiveButtons = () => {
    interactionsContainer.innerText = ""
    
    const endTurnBtn = document.createElement("button")
    endTurnBtn.id = "end-btn"
    endTurnBtn.className = "int-buttons"
    endTurnBtn.innerText = "End turn!"

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

    interactionsContainer.append(endTurnBtn, giveUp, buyCompany, payService, sellCompany, buyServer)
}

const buyCompany = () => {
    console.log("Buy company?")
    const buyBtn = document.querySelector("#buy-company")
    buyBtn.style.visibility = "visible"
}

const upgradeCompany = () => {
    console.log("Upgrade company?")
}

const payForServices = (data) => {
    console.log(`Pay up bitch! ${data.price * 0.1} please :)`)
    const payBtn =  document.querySelector("#pay-company")
    payBtn.style.visibility = "visible"
}

displayOptions = {
    buyCompany,
    upgradeCompany,
    payForServices
}

