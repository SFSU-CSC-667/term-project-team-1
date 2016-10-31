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
        this.name = "";
        this.score = 0;
        this._id = -1;

    }




    get id ()
    {
        return this._id;
    }

    get name ()
    {
        return super.name;
    }

    set name (newName)
    {
        super.name = newName;
    }

    register ()
    {

        super.registerUser(this._name, this._score);
    }

    isRegistered ()
    {
        super.isUserRegistered()
    }

    static newPlayer (newName, newEmail, newPassword)
    {
        var player =  new this(newEmail, newPassword);
        player.name = newName;
        return player;
    }

    updateScore(newScore)
    {
        super.setScore(newScore);
    }

    printUserInfo() {

        super.printInConsole(super.email, super.password);

    }

}

module.exports = User;
