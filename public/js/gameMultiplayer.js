/**
 * Created by jose ortiz on 12/4/16.
 */


// DOM Ready =============================================================
$(document).ready(function()
{
    startMultiplayerInstance();
});


function startMultiplayerInstance () {
    var multiplayerIO = gameio();
    multiplayerIO.emit("game", "Jose");
}