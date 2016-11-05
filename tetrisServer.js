var user = require ('./server_classes/core/User.js');
var player = user.newPlayer("John M", "new@mail.com", "mypassw");
player.register();
player.sendResponse()

