import ENDPOINTS from './endpoints';

class ApiManager {
    constructor() {
        this.ENDPOINTS = ENDPOINTS;
    }

    async register(login, password) {
        const response = await fetch(this.ENDPOINTS.REGISTER(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                login, 
                password 
            })
        });
        return await response.json();
    }

    async login(login, password) {
        const response = await fetch(this.ENDPOINTS.LOGIN(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                login, 
                password 
            })
        });
        return await response.json();
    }

    async getUser(userid) {
        const response = await fetch(this.ENDPOINTS.GET_USER(userid));
        return await response.json();
    }

    async getUserByUsername(username) {
        const response = await fetch(this.ENDPOINTS.GET_USER_BY_USERNAME(username));
        return await response.json();
    }

    async searchUsers() {
        const response = await fetch(this.ENDPOINTS.SEARCH_USERS());
        return await response.json();
    }

    async createGame() {
        const response = await fetch(this.ENDPOINTS.CREATE_GAME());
        return await response.json();
    }

    async joinGame(gameid) {
        const response = await fetch(this.ENDPOINTS.JOIN_GAME(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameid })
        });
        return await response.json();
    }

    async moveGame(gameid, move) {
        const response = await fetch(this.ENDPOINTS.MOVE_GAME(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameid, move })
        });
        return await response.json();
    }

    async getGame(gameid) {
        const response = await fetch(this.ENDPOINTS.GET_GAME(gameid));
        return await response.json();
    }

    async searchGames() {
        const response = await fetch(this.ENDPOINTS.SEARCH_GAMES());
        return await response.json();
    }
}

// thanks to https://dhruvpvx.medium.com/the-most-effective-method-for-managing-api-calls-in-your-react-or-react-native-project-fe4293a7905f