/**
 * Created by adisonlee on 11/21/16.
 */

// DOM Ready =============================================================
$(document).ready(function()
{
    chatSocketIO();
});

function chatSocketIO()
{
    var socket = io();
    $('form').click(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#chatbox').append($('<p>').text(msg.message)).animate({
            "scrollTop": $('#chatbox')[0].scrollHeight
        }, "fast");

    });

    /*
     socket.on('chat message', function(msg){
     $('#chatbox').append('<li>' + msg.message).animate({
     "scrollTop": $('#chatbox')[0].scrollHeight
     }, "fast");
     });
     */
}
