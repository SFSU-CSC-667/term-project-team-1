/**
 * Created by   Jose Ortiz on 10/27/16.
 * File:        globals.js
 * Description: This file contains an array of globals that are
 *              accessible in all the scopes of this application
 * Usage:       let's assume that you have a global domain in this
 *              file like this: var Globals { 'domain':'www.mydomain.com';}
 *              Then, the following code show how to access this global
 *              constant from other file inside the scope of this application:
 *
 *              var globals = require('globals');
 *              var myDomain = globals.domain
 */


 var app_config = {

    // database providers
    'DATABASE_PROVIDER':'postgres:' + "//",

    // DO NOT MODIFY: this is the default port for Postgres
    'DATABASE_URL':'@localhost:5432/',

     // username created for database
    'DATABASE_USERNAME':'alee',

     // password created for database
    'DATABASE_PASSWORD' : 'misterlee83191',

     // name of the database
    'DATABASE_NAME' : 'tetrisDB',

    // Server root outside public folder
    'SERVER_ROOT' : './server_classes/',

    // Api route for users
    'USERS_API_ROUTE' : '/users',

    // Api route for lobbies
    'LOBBIES_API_ROUTE' : '/lobbies',

    // Aoi route for games
    'GAMES_API_ROUTE' : '/games'

}

/* Don't comment or remove this line. This allows the global scope of this file */
module.exports = app_config;
