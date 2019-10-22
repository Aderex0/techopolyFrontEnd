const game_id = 1;
BASE_URL = `http://localhost:3000`;
GAME_URL = `${BASE_URL}/games/${game_id}`;
PLAYER_URL = `${BASE_URL}/players`
BANK_URL = `${BASE_URL}/players/1`

const get = (url) => {
    return fetch(url).then(resp => resp.json());
}

const patch = (url, body) => {
    return fetch(url, {
        "method": "PATCH",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify(body)
    }).then(resp => resp.json)
}

API = {
    get,
    patch
}