//global constants
const game_id = 8;
let current_player_id = 1;
let players = [];
let player_one_container = document.getElementById("player-one-card")
let player_two_container = document.getElementById("player-two-card")

//Needs to be a function that comes from the initialization

BASE_URL = `http://localhost:3000`;
GAME_URL = `${BASE_URL}/games/${game_id}`;
PLAYER_URL = `${BASE_URL}/players`


const get = (url) => {
    return fetch(url).then(resp => resp.json());
}

API = {
    get
}

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
        renderPlayer(player);
    })
    current_player_id = 1;
}

const renderPlayer = (player) => {
    createPlayerCard(player);
    createPlayerIcon();
}

const createPlayerCard = (player) => {
    let header = createHeader(player)
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

const createHeader = (player) => {
    let header = document.createElement("h2")
    header.textContent = player.name
    return header
}

const createMoney = (player) => {
    let money = document.createElement("p")
    money.textContent = `Money: $${player.money}`
    return money
}