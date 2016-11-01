var user = require ('./public/js/core/User.js');
var player = user.newPlayer("John M", "johnms@mail.com", "mypassw");
player.register();
player.sendResponse()

