/**
 * Created by jose ortiz on 12/4/16.
 */

$(document).ready(function()
{
    initMultiplayerSocket();
    var param = getParameterByName("gameid");
    updateScore("22000", param);
    //changeScore(1, "1000");


});

function initMultiplayerSocket ()
{
    var multiplayerSocket = io();
    var gameid = getParameterByName("gameid");
    multiplayerSocket.emit("multiplayer", gameid);
}

function updateScore (score, gameid)
{
    var updatedScoreSocket = io();
    updatedScoreSocket.emit("updateScore", score, gameid);



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

function changeScore (playerid, newScore)
{
    // Empty content string
    var tableContent = '';


                if (playerid == 1) {

                    tableContent += '<tr>';
                    tableContent += '<td>' + newScore + '</td>';
                    tableContent += '<td> 0 </td>';
                    tableContent += '</tr>';
                }
                else {
                    tableContent += '<tr>';
                    tableContent += '<td> 0 </td>';
                    tableContent += '<td>' + newScore + '</td>';
                    tableContent += '</tr>';
                }


                // Inject the whole content string into our existing HTML table
                $('#scores table tbody').html(tableContent);



}

function updateGameScore( gameid, newscore) {
    jQuery.each( [ "put", "delete" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
            if ( jQuery.isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

    $.put('http://localhost:3000/dbapi/games/' + gameid, {totalscore:newscore}, function(result){
        console.log(result);
    })
}

