/**
 * Created by jose ortiz on 12/4/16.
 */


$(document).ready(function()
{

    initMultiplayerSocket();

});

function initMultiplayerSocket ()
{
    var multiplayerSocket = io();
    multiplayerSocket.emit("multiplayer", "Jose");
}