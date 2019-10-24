//global constants
BANK_URL = `${BASE_URL}/players/1`
COMPANY_URL = `${BASE_URL}/companies`

let current_player_id = 2;
let player_one_container = document.getElementById("player-one-card")
let player_two_container = document.getElementById("player-two-card")

//Needs to be a function that comes from the initialization

const getPlayerTurn = (url) => {
    API.get(url)
    .then(gameData => {
        current_player_id = gameData.player_turn
        console.log(current_player_id)
    })
}

const getPlayers = (url) => {
    API.get(url)
    .then(gameData => renderPlayers(gameData))
}

const renderPlayers = (gameData) => {
    gameData.players.forEach(player => {
        if (player.id != 1) {
            renderPlayer(player);
        }
    })
    current_player_id = 2;
}

const renderPlayer = (player) => {
    createPlayerCard(player);
    createPlayerIcon();
}

const createPlayerCard = (player) => {
    let header = createPlayerHeader(player)
    let money = createMoney(player)
    populateUserCard(header, money);
}

const populateUserCard = (header, money) => {
    if (player_one_container.hasChildNodes()) {
        player_two_container.appendChild(header);
        player_two_container.appendChild(money);
    } else {
        player_one_container.appendChild(header);
        player_one_container.appendChild(money);
    }
}

const createPlayerIcon = () => {
    const startBlock = document.querySelector("[data-id='1']")
    const player = document.createElement("div")
    const p = document.querySelector("#roll")
    p.innerText = "roll the dice!"
    player.id = `player${current_player_id}`
    startBlock.appendChild(player)
    current_player_id += 1 
}

const createPlayerHeader = (player) => {
    let header = document.createElement("h2")
    header.textContent = player.name
    return header
}

const createMoney = (player) => {
    let money = document.createElement("p")
    money.textContent = `Money: $${player.money}`
    return money
}

const getCompanies = () => {
    API.get(COMPANY_URL) 
    .then(companyData => renderCompanies(companyData))
}

const renderCompanies = (companyData) => {
    companyData.game.forEach(company => {
        renderCompany(company)
    })
}

const renderCompany = (company) => {
    let tile = findTile(company)
    let header = createCompanyHeader(company)
    let price = createPrice(company)
    let industry = createIndustry(company)
    tile.append(header, price, industry)
}

const findTile = (company) => {
    let tile_number = company.tile_number
    let tile = document.querySelector(`div[data-id="${tile_number}"`)
    tile.setAttribute("id", company.id)
    return tile
}

const createCompanyHeader = (company) => {
    let header = document.createElement("h2");
    header.textContent = company.name
    return header
}

const createPrice = (company) => {
    let price = document.createElement("p");
    price.textContent = `£${company.price}`
    return price
}

const createIndustry = (company) => {
    let industry = document.createElement("p")
    industry.textContent = company.industry
    return industry
}

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