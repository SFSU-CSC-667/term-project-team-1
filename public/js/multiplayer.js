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
    var gameid = getParameterByName("gameid");
    var player1 = getParameterByName("player1");
    var player1Data = getPlayerInfo(player1);
    multiplayerSocket.emit("multiplayer", player1Data.name);

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

function getPlayerInfo (playerid)
{
    var playerInfo = {id: 0, name: "", isPlaying: false, score: 0};
    var playerurl = '/dbapi/users/' + playerid;
    $.getJSON( playerurl , function (data) {
        if (data['status'] == 'success') {
            // For each item in our JSON, add a table row and cells to the content strin
            var player = data['users'][0];
            playerInfo.id = player.id;
            playerInfo.name = player.name;
            playerInfo.score = player.score;
            playerInfo.isPlaying = false;

        }
        return player;
    });
}



function updatePlayerScore (playerid)
{

}


function updateGameScore (gameid)
{

}