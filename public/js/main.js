/**
 * Created by Jose Ortiz on 10/26/16.
 * File : main.js
 * Description: test file
 */
var userModel = require('./core/User.js');
var userInDB = new userModel("joseortizcosta@icloud.com", "passwd");
console.log("User Info:");
userInDB.printUserInfo();