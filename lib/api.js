const game_id = 1;
BASE_URL = `http://localhost:3000`;
GAME_URL = `${BASE_URL}/games/${game_id}`;
COMPANY_URL = `${BASE_URL}/companies`
PLAYER_URL = `${BASE_URL}/players`
BANK_URL = `${BASE_URL}/players/1`

const get = (url) => {
    return fetch(url).then(resp => resp.json()).catch(console.error);
}

const update = (url, body) => {
    return fetch(url, {
        "method": "PATCH",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify(body)
    }).then(resp => resp.json())
}

const post = (url, body) => {
    return fetch(url, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify(body)
    }).then(resp => resp.json())
}



const API = {
    get,
    update,
    post
}