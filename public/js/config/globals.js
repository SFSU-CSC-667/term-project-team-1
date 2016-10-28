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

    // For local development. Replace with your local postgres database url
    'DATABASE_URL':'@localhost:5432/',

    'DATABASE_USERNAME':'josesfval',

    'DATABASE_PASSWORD' : 'mypasswd',

    'DATABASE_NAME' : 'tetrisDB',


}

/* Don't comment or remove this line. This allows the global scope of this file */
module.exports = app_config;
