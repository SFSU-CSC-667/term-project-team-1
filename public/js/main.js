/**
 * Created by Jose Ortiz on 10/26/16.
 * File : main.js
 * Description: test file
 */

var user = require('./core/User.js');

// Add players to database.
var player1 = user.newPlayer("Player1", "player1@icloud.com", "passwd1");
var player2 = user.newPlayer("Player2", "player2@icloud.com", "passwd2");
player1.register();
player2.register();


// Check if a player already exist.
var player1 = new user ("player1@icloud.com", "passwd1");
player1.isRegistered(); // true
var player2 = new user ("player2@icloud.com", "passwd2");
player2.isRegistered(); // true
var player3 = new user ("player3@icloud.com", "passwd3");
player3.isRegistered(); // false

// Update scores
player1.updateScore(100);
player2.updateScore(200);

// Print all players info in JSON format.
player1.printUserInfo();
player2.printUserInfo();


player1.createNewLobby('My first lobby');








