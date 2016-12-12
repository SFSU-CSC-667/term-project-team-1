/**
 * Created by jose ortiz on 12/4/16.
 */

$(document).ready(function () {
    initMultiplayerSocket();
    userJoined("Hello Word");
    initGame();

});
var gameisFull = false;
var isPlaying = false;
var gameSubtitle = "";   // will show in screen info about the players
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

// let's assume that the client page, once rendered, knows what room it wants to join
var room = gameid;

/*
 * Emits using socket client
 */





/*
 *  Socket io mildware
 */
socket.on('connect', function() {
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('joinGame', room);
});

socket.on("userJoined", function (data) {
    alert(data + " joined to game");
})

socket.on("addPlayerToGame", function (data) {
    document.getElementById('playing').innerHTML = data + '</b>';
    socket.emit("onGame", room);
})

socket.on('playGame', function(data) {
    play();
    socket.emit('resetTimer', room);
});

socket.on('updateTimer', function (data) {
    var time = data;
    if (data < 10)
    {
        time = '0' + data;
    }
    document.querySelector('#time').innerHTML = '00:' + time + ' seconds left' ;

});

socket.on("waitUntilNextPlayer", function (data) {

})



socket.on('nextPlayer', function (data, socketid) {

    document.getElementById('whoIsPlaying').innerHTML = data + " is playing now....";
    if (socket.id == socketid)
    {
        alert("You are up for the next round...");
        // enable keys and camvas, also enable scores


    }
    else
    {
        alert("Your time for this round is up. Close the box to see the next player round");
        // disable keys or cambas, also disable score
    }

})

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

    socket.emit("nextKey", code);
};


socket.on('nextKey', function (code) {

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


});










