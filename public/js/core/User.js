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

        super()
        this.email = email;
        this.password = password;
    }


    printUserInfo() {

        super.printInConsole(this.email, this.password);

    }


}

module.exports = User;
