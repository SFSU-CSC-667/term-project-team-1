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


var app_sessions = {

    // database providers
    'USER_SESSION': -1

}

module.exports = app_sessions;