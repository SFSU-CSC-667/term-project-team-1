/**
 * Author:      Jose Ortiz
 * Date:        Thursday October 27, 2016
 * Description: This class is handles the connection to the database.
 *
 */
"use strict";
let connection;
let globals = require('../config/globals'); // gets config constants


class DatabaseManager {

    constructor(router) {
        this.router = router;
        this.users = require('./models/users');
        this.games = require('./models/games');
    }

    set router(router) {
        if (router) {
            this._router = router;
        }
    }

    set users(users) {
        if (users) {
            this._users = users;
        }
    }

    set games(games) {
        if (games) {
            this._games = games;
        }
    }

    get users() {
        return this._users;
    }

    get games() {
        return this._games;
    }

    get router() {
        return this._router;
    }

    loadDBAPI(routeUsers, routeGames, routeValidation) {
        this._loadUsersAPI(routeUsers);
        this._loadGamesAPI(routeGames);
        this._loadValidationAPI(routeValidation);
    }

    _loadUsersAPI(route) {
        const id = '/:id';
        const routeWithParam = route + id;
        this.router.get(route, this.users.getAllUsers);
        this.router.get(routeWithParam, this.users.getSingleUser);
        this.router.post(route, this.users.createUser);
        this.router.put(routeWithParam, this.users.updateUser);
        this.router.delete(routeWithParam, this.users.removeUser);

    }

    _loadGamesAPI(route) {
        const id = '/:id';
        const routeWithParam = route + id;
        this.router.get(route, this.games.getAllGames);
        //this.router.get(routeWithParam, this.games.getGamesByUser);
        this.router.get(routeWithParam, this.games.getSingleGame);
        this.router.post(route, this.games.createGame);
        this.router.put(routeWithParam, this.games.updateScore);
        this.router.delete(routeWithParam, this.games.removeGame);
    }

    _loadValidationAPI(route) {
        this.router.post(route, this.users.validateUser)
    }


}

/* Don't comment or remove this line. This allows the global scope of this file */
module.exports = DatabaseManager;