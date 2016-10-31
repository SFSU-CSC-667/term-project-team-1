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
let postgressDBProvider = globals.postgres_database;
let connectionMode
class UserModel extends DatabaseManager {
    constructor(email, password) {
        super();
        this._email = email;
        this._password = password;
        this._name = "";
        this._score = 0;
        this._id = -1;

    }

    get email ()
    {
        return this._email;
    }

    get password ()
    {
        return this._password;
    }

    get name ()
    {
        return this._name;
    }

    get score ()
    {
        return this._score;
    }

    get id ()
    {
        return this,_id;
    }

    set email (newEmail)
    {
        if (newEmail)
        {
            this._email = newEmail;
        }
    }

    set password (newPassword)
    {
        if (newPassword)
        {
            this._password = newPassword;
        }
    }

    set name (newName) {
        if (newName)
        {
            this._name = newName;
        }
    }

    set score (newScore)
    {
        if (newScore)
        {
            this._score = newScore;
        }
    }

    set id (newId)
    {
        if (newId)
        {
            this.id = newId;
        }
    }
    printInConsole(usr_email, usr_password) {
        client = super.connect();
        client.query('SELECT * FROM users WHERE email = ($1::varchar) and password = ($2::varchar)',
            [usr_email, usr_password], function (err, result) {
                if (err) {
                    return console.error('error happened during query', err)
                }
                return console.log(result.rows[0]);
            });
        client.closeConnection;
    }

}

function setValue (attribute, value)
{
    attribute = value;

}

function getBoolStatus (value)
{
    return value;
}

module.exports = UserModel;
