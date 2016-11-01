/**
 * Author:      Jose Ortiz
 * File:        User.js
 * Date:        Thursday October 27, 2016
 * Description: This class extends userModel class and provides useful methods
 *              to get information from the user entity
 *
 */
"use strict";
let globals = require('../config/globals.js');
let UserModel = require('../database/models/userModel.js');

class User extends UserModel {

    constructor(email, password) {

        super(email, password);


    }

    register ()
    {
        var db = super.connectWithPromise();
        var oldScore = this._score;
        db.any("INSERT INTO Users(email, name, password, score) values($1, $2, $3, $4) Returning id",
            [this._email, this._name, this._password, this._score])
            .then((data) => {
                console.log(this._name + " has been successfully registered with ID: " + data[0].id);
                db.closeConnection;
            })
            .catch((error) => {
                console.log("ERROR: " + this._name + " could not be registered because the email " + this._email  +
                            " already was registered by another player. DETAILED ERROR: ", error.message || error); // print error;
                 });


    }

    isRegistered ()
    {
        var db = super.connectWithPromise();

        db.any("SELECT * FROM users WHERE email = $1 AND password = $2", [this._email, this._password])
            .then((data) => {
               if (typeof data[0] != 'undefined' && data[0].id > 0)
               {
                   console.log(data[0].name + " is already registered with ID: " + data[0].id)
               }
               else
               {
                   console.log("Player not found");
               }
               db.closeConnection;
            })
            .catch(function (error) {
                console.log("ERROR:", error.message || error); // print error;
            });
    }

    static newPlayer (newName, newEmail, newPassword)
    {
        var player =  new this(newEmail, newPassword);
        player.name = newName;
        return player;
    }



    printUserInfo() {

        super.printInConsole(super.email, super.password);


    }


    updateScore (newScore)
    {
        var db = super.connectWithPromise();
        var oldScore = this._score;
        db.any("UPDATE Users SET score = $1 WHERE email = $2", [newScore, this._email])
            .then((data) => {
                console.log("Updated from score " + oldScore + " to  " + newScore)
                db.end;
            })
            .catch(function (error) {
                console.log("ERROR:", error.message || error); // print error;
            });

    }

    createNewLobby (name)
    {

        var db = super.connectWithPromise();
        var lobbies = [];
        db.any("INSERT INTO Lobbies (owner, name, isActive, max_games, max_players) VALUES ($1, $2, $3, $4, $5) Returning id",
               [1, name, true, 1, 2])
            .then((data) => {
                console.log("Lobby " + name + " has been successfully created with ID: " + data[0].id);
                db.closeConnection;
            })
            .catch((error) => {
                console.log("ERROR: Lobby " + name + " could not be created. DETAILED ERROR: ", error.message || error); // print error;
            });
    }


    getLobbies (name)
    {
        var lobbies = [];
        var db = super.connectWithPromise();
        db.any("SELECT * FROM lobbies WHERE owner = $1", [this._id])
            .then((data) => {

                db.closeConnection;
            })
            .catch(function (error) {
                console.log("ERROR:", error.message || error); // print error;
            });
    }


    sendResponse ()
    {
        var express = require('express')
        var app = express()
        app.set('view engine', 'pug')

        app.get('/', (req, res) => {
            var db = super.connectWithPromise();

            db.any("SELECT * FROM users WHERE email = $1 AND password = $2", [this._email, this._password])
                .then((data) => {
                    if (typeof data[0] != 'undefined' && data[0].id > 0)
                    {
                        res.render(
                            'index',
                            { title: 'Tetris Home Page', description: 'Registered player information' , name:
                            data[0].name, email: data[0].email})
                    }
                    else
                    {
                        console.log("Player not found");
                    }
                    db.closeConnection;
                })
                .catch(function (error) {
                    console.log("ERROR:", error.message || error); // print error;
                });


        })

        app.listen(3000, function () {
            console.log('Tetris app example listening on port 3000!')
        })/**
     * Created by master_cs_se on 11/1/16.
     */
    }


}

function setValue (attribute, value)
{
    attribute = value;

}

module.exports = User;
