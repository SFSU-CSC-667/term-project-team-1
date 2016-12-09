/**
 * Created by jose ortiz on 12/4/16.
 */

$(document).ready(function () {
    initMultiplayerSocket();
    userJoined("Hello Word");
    initGame();

});
var gameisFull = false;
function initMultiplayerSocket() {
    var multiplayerSocket = io();
    var gameid = getParameterByName("gameid");
    multiplayerSocket.emit("multiplayer", gameid);
}

function updateScore(newscore) {
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

function disableKeys(timeLeft) {
    if (timeLeft == 0) {
        // will emit a socket.imit to disable keyboard keys for actual
        // player and pass control to the other player
    }
}

function getPlayerInfo(playerid) {
    var playerInfo = {id: 0, name: "", isPlaying: false, score: 0};
    var playerurl = '/dbapi/users/' + playerid;
    $.getJSON(playerurl, function (data) {
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


function changeScoreInPugAttribute(playerid, newScore) {
    var player1 = getParameterByName("player1");
    var player2 = getParameterByName("player2");
    if (playerid == player1) {

        $('#player1').html(newScore);
    }
    else {
        $('#player2').html(newScore);
    }
}

function userJoined(msg) {
    var socket = io();
    socket.emit('joinGame', msg);
}


var socket = io();

var gameid = getParameterByName("gameid");
var owner = getParameterByName("player1");
var opponent = getParameterByName("player2");

socket.emit("gameConnected", owner, opponent, gameid);

var users = 1;
socket.on('onConnect', function (data) {
    // if the ok button is clicked, result will be true (boolean)

    // the user clicked ok
    if (users <= 2) {
        play();

        var title = document.getElementById('start').innerHTML;
        if (title == "press TAB to begin") {
            title = "The challenge has started....";
        }
        document.getElementById('start').innerHTML = title + '</br>' + data;
        users++;
    }
    else {
        gameisFull = true;

    }
});


/* client multiplayer emits automatically without callinf functions*/

socket.emit("gameIsFull", gameisFull, gameid);

// here set up the new score for player 2.

document.onkeydown = function (e) {
    var code = 0;
    switch (e.keyCode) {
        case 37:

            code = 37;
            break;
        case 38:

            code = 38;
            break;
        case 39:

            code = 39;
            break;
        case 40:

            code = 40;
            break;
    }

    socket.emit("rotate", code);
};

socket.on("rotate", function (code) {
    if (owner != opponent && opponent > 0) {
        switch (code) {
            case 37:

                move(DIR.LEFT);
                break;
            case 38:
                rotate();
                break;
            case 39:
                move(DIR.RIGHT);

                break;
            case 40:
                drop();

                break;
        }
    }
});






