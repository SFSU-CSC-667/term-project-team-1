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

    setScore (newScore)
    {
        client = super.connect();
        var oldScore = this._score;
        client.query("Update Users SET score = $1 WHERE email = $2",
            [newScore, this._email] , function (err, result) {

                if (err)
                {
                    return console.error('Internal Error happened. User ' + this._name + ' was not updated')
                }

                console.log("Score was updated from " + oldScore + " to " + newScore);
            });
        client.closeConnection;
    }

    isUserRegistered ()
    {
        client = super.connect();
        var query = client.query("SELECT COUNT(*) > 0, name FROM users WHERE email = $1 AND password = $2 GROUP BY name", [this._email, this._password]);
        query.on("row", function (row, result) {

            result.addRow(row);
        });
        query.on("end", function (result, err) {

            if (result.rows == 0)
            {
                return console.log("Player not found");
            }
            else
            {
               return console.log(result.rows[0]['name'] + ' is already registered');
            }

        });


    }

    registerUser (name, score)
    {
        client = super.connect();
        client.query("INSERT INTO Users(email, name, password, score) values($1, $2, $3, $4)",
            [this._email, name, this._password, score] , function (err, result) {

                if (err)
                {
                    return console.error('Internal Error happened. User ' + this._name + ' was not registered')
                }

                console.log(name  + ' successfully registered');
         });
         client.closeConnection;

    }

    printInConsole(usr_email, usr_password) {
        client = super.connect();
        client.query('SELECT * FROM users WHERE email = ($1::varchar) and password = ($2::varchar)',
            [usr_email, usr_password], function (err, result) {
                if (err) {
                    return console.error('error happened during query', err)
                }
                console.log(result.rows[0]);
            });
        client.closeConnection;
    }









}

module.exports = UserModel;
