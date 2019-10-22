//global constants
const game_id = 8;
//Needs to be a function that comes from the initialization

BASE_URL = `http://localhost:3000`;
GAME_URL = `${BASE_URL}/${game_id}`;
PLAYER_URL = `${BASE_URL}/players`



const get = (url) => {
    return fetch(url).then(resp => resp.json());
}

const getPlayerTurn = (url) => {
    get(url)
    .then(gameData => {
        console.log(gameData.player_turn)
    })
}

const getPlayers = (url) => {
    get(url)
    .then(gameData => renderPlayers(gameData))
}

const renderPlayers = (gameData) => {
    gameData.players.forEach(player => {
        renderPlayer(player);
    })
}

const renderPlayer = (player) => {
    console.log("hello")
}

getPlayerTurn(GAME_URL)
// getPlayers(GAME_URL);
