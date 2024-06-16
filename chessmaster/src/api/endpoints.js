const BASE_URL = 'http://localhost:5273/api';


const ENDPOINTS = {
    REGISTER: () =>
        `${BASE_URL}/accounts/register`,
    LOGIN: () =>
        `${BASE_URL}/accounts/login`,

    GET_USER: (userid) =>
        `${BASE_URL}/users/${userid}`,
    GET_USER_BY_USERNAME: (username) =>
        `${BASE_URL}/users/${username}`,
    SEARCH_USERS: () =>
        `${BASE_URL}/users`,

    CREATE_GAME: () =>
        `${BASE_URL}/games/create`,
    JOIN_GAME: () => 
        `${BASE_URL}/games/join`,
    MOVE_GAME: () =>
        `${BASE_URL}/games/move`,
    GET_GAME: (gameid) => 
        `${BASE_URL}/games/${gameid}`,
    SEARCH_GAMES: () => 
        `${BASE_URL}/games`,
};

export default ENDPOINTS;