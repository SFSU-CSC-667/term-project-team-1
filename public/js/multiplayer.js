/**
 * Created by jose ortiz on 12/4/16.
 */

$(document).ready(function () {
    initMultiplayerSocket();
    userJoined("Hello Word");

});
var score1 = 0; // score for player 1
var score2 = 0; // score
var socket = io();
var gameid = getParameterByName("gameid");
var score = 0;
var winner = "";
var playerid = "";
// let's assume that the client page, once rendered, knows what room it wants to join
var room = gameid;
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



function userJoined(msg) {
    var socket = io();
    socket.emit('joinGame', msg);
}

function toastMessage(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}


/*
 *  Sockets logic for clients
 */
socket.on('connect', function () {
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('joinGame', room);
});

socket.on("userJoined", function (data) {
    //alert(data + " joined to game");
    toastMessage('Player joined!');
})


socket.on("addPlayerToGame", function (isMultiplayerMode, data, playerDescriptor) {
    document.getElementById('player1').innerHTML = playerDescriptor.playername + " score: ";
    playerid = playerDescriptor.playerid;
    socket.emit("isGameFull", 0);
    if (isMultiplayerMode) {
        socket.emit("isGameFull", room, 1);
        document.getElementById('start').innerHTML = 'Playing in Multiplayer Mode' + '</b>';
        document.getElementById('player1').innerHTML = playerDescriptor.playername + " score: ";
        document.getElementById('player2').innerHTML = playerDescriptor.opponent + " score: ";
        document.getElementById('score2').innerHTML = "00000";

    }
    else {
        document.getElementById('score2').innerHTML = "";
        document.getElementById('time').innerHTML = "";
    }
    document.getElementById('playing').innerHTML = data + '</b>';
    socket.emit("onGame", room);
})

socket.on('playGame', function (room) {
    index = 0; // player index in game.
    play();
    socket.emit('resetTimer', room);
});

socket.on('updateTimer', function (data) {
    var time = data;
    if (data < 10) {
        time = '0' + data;
    }
    document.querySelector('#time').innerHTML = '00:' + time + ' seconds left';

});

socket.on("waitUntilNextPlayer", function (data) {

})


socket.on('nextPlayer', function (nextPlayer) {

    document.getElementById('whoIsPlaying').innerHTML = nextPlayer.name + " is playing now....";

    if (socket.id == nextPlayer.socketid) {
        //toast here("You are up for the next round...");
        //$('#score').html(displayedscore);

        toastMessage('You are up next..');

    }
    else {
        //toast here("Your time for this round is up. Close the box to see the next player round");
        //$('#score2').html(displayedscore);
        toastMessage('Your time for this round is up.');

    }


})


socket.on("score", function (data) {
    document.getElementById(data.scoreid).innerHTML = data.score;

})

socket.on("end", function (room, winnerInfo) {
    //end();
    socket.emit("DetermineWinner", room);
    // add toast here
    toastMessage('Game over. ' + winnerInfo.winner + ' has won the game with a score of ' + winnerInfo.score);
    index = 0; // player index in game.
    reset();
    socket.emit('resetTimer', room);

})

socket.on("restart", function(){
   reset();
});













