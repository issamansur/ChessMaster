const BASE_URL = 'https://animated-pancake-4rwjw457gr73j5vp-5273.app.github.dev/api';


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
    SEARCH_FREE_GAMES: () => 
        `${BASE_URL}/games?state=1&page=1&pageSize=1`,
};

export default ENDPOINTS;