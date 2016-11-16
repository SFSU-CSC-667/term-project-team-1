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
        this.lobbies = require('./models/lobbies');
        this.games = require('./models/games');
    }

    set router (router)
    {
        if (router)
        {
            this._router = router;
        }
    }

    set users (users)
    {
        if (users)
        {
            this._users = users;
        }
    }

    set lobbies (lobbies)
    {
        if (lobbies)
        {
            this._lobbies = lobbies;
        }
    }

    set games (games)
    {
        if (games)
        {
            this._games = games;
        }
    }

    get users ()
    {
        return this._users;
    }

    get lobbies ()
    {
        return this._lobbies;
    }

    get games ()
    {
        return this._games;
    }

    get router ()
    {
        return this._router;
    }

    loadDBAPI (routeUsers, routeLobbies, routeGames)
    {
        this._loadUsersAPI(routeUsers);
        this._loadLobbiesAPI(routeLobbies);
        this._loadGamesAPI(routeGames);
    }
    _loadUsersAPI (route)
    {
        const id = '/:id';
        const routeWithParam = route + id;

        this.router.get(route, this.users.getAllUsers);
        this.router.get(routeWithParam, this.users.getSingleUser);
        this.router.post(route, this.users.createUser);
        this.router.put(routeWithParam, this.users.updateUser);
        this.router.delete(routeWithParam, this.users.removeUser);

    }

    _loadLobbiesAPI (route)
    {
        const id = '/:id';
        const owner = '/owner';
        const routeWithOwner = route + owner + id;
        const routeWithParam = route + id;

        this.router.get(route, this.lobbies.getAllLobbies);
        this.router.get(routeWithOwner, this.lobbies.getLobbiesByOwner);
        this.router.get(routeWithParam, this.lobbies.getSingleLobby);
        this.router.post(route, this.lobbies.createLobby);
        this.router.put(routeWithParam, this.lobbies.updateLobby);
        this.router.delete(routeWithParam, this.lobbies.removeLobby);
    }

    _loadGamesAPI (route)
    {
        const id = '/:id';
        const lobby = '/lobby';
        const routeWithLobby = route + lobby + id;
        const routeWithParam = route + id;

        this.router.get(route, this.games.getAllGames);
        this.router.get(routeWithLobby, this.games.getGamesByLobby);
        this.router.get(routeWithParam, this.games.getSingleGame);
        this.router.post(route, this.games.createGame);
        this.router.put(routeWithParam, this.games.updateGame);
        this.router.delete(routeWithParam, this.games.removeGame);
    }


}

/* Don't comment or remove this line. This allows the global scope of this file */
module.exports = DatabaseManager;