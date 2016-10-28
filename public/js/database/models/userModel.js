/**
 * Author:      Jose Ortiz
 * File:        userModel.js
 * Date:        Thursday October 27, 2016
 * Description: This class is a user model that handles abstractly all the attributes
 *             and values from the user entity.
 *
 */

"use strict";
let DatabaseManager = require('../dbManager.js');
let client;
let globals = require('../../config/globals');
var email = "";
var password = "";
let postgressDBProvider = globals.postgres_database;
let connectionMode
class UserModel extends DatabaseManager {
    constructor() {
        super();
    }

    printInConsole(usr_email, usr_password) {
        client = super.connect();
        client.query('SELECT * FROM users WHERE email = ($1::varchar) and password = ($2::varchar)',
            [usr_email, usr_password], function (err, result) {
                if (err) {
                    return console.error('error happened during query', err)
                }
                console.log(result.rows[0]);
            })
        client.closeConnection;
    }
}

module.exports = UserModel;
