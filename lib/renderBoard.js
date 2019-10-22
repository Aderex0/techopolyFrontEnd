/global constants
const game_id = 8;
//Needs to be a function that comes from the initialization

BASE_URL = `http://localhost:3000`;
GAME_URL = `http://localhost:3000/games/${game_id}`;

const getGamePlayer = (url) => {
    return fetch(url).then(resp => resp.json());
}

getGamePlayer(GAME_URL);