/**
 * Created by Jose Ortiz on 10/26/16.
 * File : main.js
 * Description: test file
 */


// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // loads the leaderboard list
    loadLeadersBoard();
    // loads games list
    loadGamesList();

    var userid = getParameterByName("userid");
    var strLink = "lobbyRoom?userid=" + userid;
    document.getElementById("joinlobby").setAttribute("href",strLink);

    
});

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


// Functions =============================================================

// Fill table with data
function loadLeadersBoard() {

    // Empty content string
    var tableContent = '';


    // jQuery AJAX call for JSON
    $.getJSON('/dbapi/users', function( data ) {
        if (data['status'] == 'success') {

            // For each item in our JSON, add a table row and cells to the content strin
            var users = sortByKey(data['users'], 'score');
            for (var i = 0; i<users.length; i++) {

                var user = users[i];

                tableContent += '<tr>';
                tableContent += '<td>' + (i + 1) + '</td>';
                tableContent += '<td>' +  user.name + '</td>';
                tableContent += '<td>' +  user.email + '</td>';
                tableContent += '<td>' + user.score + '</td>';
                tableContent += '</tr>';


                // Inject the whole content string into our existing HTML table
                $('#userList table tbody').html(tableContent);
            }
        }
    });
}

function loadGamesList() {

    var tableContent = '';
    $.getJSON('/dbapi/games', function (data) {
        if (data['status'] == 'success') {

            // For each item in our JSON, add a table row and cells to the content strin
            var games = sortByKey(data['games'], 'totalscore');
            for (var i = 0; i < games.length; i++) {

                var game = games[i];
                var join = "Join to this game";
                if (game.isfull == true) {
                    join = "This game is already in progress";
                    document.getElementById('joinlink').setAttribute('href', '');
                }

                tableContent += '<tr>';
                tableContent += '<td>' + game.name + '</td>';
                tableContent += '<td>' + game.gamename + '</td>';
                tableContent += '<td>' + game.totalscore + '</td>';
                tableContent += '<td><a id="joinlink" href="/gameplay?player1=' + game.player1 + '&player2=' + getParameterByName('userid') + '&gameid=' + game.id + '">' + join + '</a></td>';
                tableContent += '</tr>';
                // Inject the whole content string into our existing HTML table
                $('#gamesList table tbody').html(tableContent);
            }
        }
    });
}

/* Sorts json item in descending order by key */
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}














