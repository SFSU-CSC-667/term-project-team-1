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
    // loads the game list to join
    loadGamesList();

    
});

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

// Fill table with data
function loadGamesList() {

    // Empty content string
    var tableContent = '';


    // jQuery AJAX call for JSON
    $.getJSON('/dbapi/games', function( data ) {
        if (data['status'] == 'success') {

            // For each item in our JSON, add a table row and cells to the content strin
            var games = sortByKey(data['games'], 'totalscore');
            for (var i = 0; i<games.length; i++) {

                var game = games[i];

                tableContent += '<tr>';
                tableContent += '<td>' +  game.name + '</td>';
                tableContent += '<td>' +  game.gamename + '</td>';
                tableContent += '<td>' +  game.isfull + '</td>';
                tableContent += '<td>' +  game.totalscore + '</td>';
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












