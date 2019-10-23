const interactionsContainer = document.querySelector("#interactions-container")

const createInteractiveButtons = () => {
    interactionsContainer.innerText = ""
    const endTurnBtn = document.createElement("button")
    endTurnBtn.id = "end-btn"
    endTurnBtn.className = "int-buttons"
    endTurnBtn.innerText = "end turn!"

    const giveUp = document.createElement("button")
    giveUp.appendChild.id = "give-ip"
    giveUp.className = "int-buttons"
    giveUp.innerText = "give up!"

    interactionsContainer.append(endTurnBtn, giveUp)
}

const buyCompany = () => {
    console.log("Buy company?")
}

const upgradeCompany = () => {
    console.log("Upgrade company?")
}

const payForServices = (data) => {
    console.log(`Pay up bitch! ${data.price * 0.1} please :)`)
}

displayOptions = {
    buyCompany,
    upgradeCompany,
    payForServices
}

