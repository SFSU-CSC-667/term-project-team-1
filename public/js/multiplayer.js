/**
 * Created by jose ortiz on 12/4/16.
 */

$(document).ready(function()
{
    initMultiplayerSocket();
    userJoined("Hello Word");
    initGame();

});

function initMultiplayerSocket ()
{
    var multiplayerSocket = io();
    var gameid = getParameterByName("gameid");
    multiplayerSocket.emit("multiplayer", gameid);
}

function updateScore (newscore)
{
    var updatedScoreSocket = io();
    var gameid = getParameterByName("gameid");
    updatedScoreSocket.emit("updateScore", newscore, gameid);
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
        return playerInfo;
    });
}


function changeScoreInPugAttribute (playerid, newScore)
{
    var player1 = getParameterByName("player1");
    var player2 = getParameterByName("player2");
    if (playerid == player1) {

        $('#player1').html(newScore);
    }
    else {
        $('#player2').html(newScore);
    }
}

function userJoined (msg)
{
    var socket = io();
    socket.emit('joinGame', msg);
}



var socket = io();

socket.emit("connected", "jose");
socket.on('broadcast',function(data){

    play();
});

socket.on("join", function () {
    // here set up the new score for player 2.
})



