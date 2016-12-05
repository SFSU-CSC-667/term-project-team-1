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

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getPlayer1Info ()
{

}

function getPlayer2Info ()
{

}

function updatePlayerScore (playerid)
{

}


function updateGameScore (gameid)
{

}