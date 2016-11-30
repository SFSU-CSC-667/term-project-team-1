/**
 * Created by Jose Ortiz on 10/26/16.
 * File : main.js
 * Description: test file
 */


// DOM Ready =============================================================
$(document).ready(function() {

    // loads the game list to join
    loadGamesList();


});

function loadGamesList() {
// jQuery AJAX call for JSON
    // Empty content string
    var tableContent = '';
    $.getJSON('/dbapi/games', function (data) {
        if (data['status'] == 'success') {

            // For each item in our JSON, add a table row and cells to the content strin
            var games = data['games']
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
                tableContent += '<td><' + game.totalscore + '</td>';
                tableContent += '<td><a id="joinlink" href="/gameplay">' + join + '</a></td>';
                tableContent += '</tr>';


                // Inject the whole content string into our existing HTML table
                $('#gamesList table tbody').html(tableContent);
            }
        }
    });
}

