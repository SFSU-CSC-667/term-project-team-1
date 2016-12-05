/**
 * Created by adisonlee on 11/21/16.
 */

// DOM Ready =============================================================
$(document).ready(function()
{
    $('#wrapper').hide();
    $('#who-are-you').focus();
    chatSocketIO();

});


function chatSocketIO()
{
    var socket = io();

    $('#initial-form button').click( event =>
    {
        userName = $( '#who-are-you' ).val();
        if(userName != '')
        {
            socket.emit('connected', userName);
            $('#initial-form').hide();
            $('#wrapper').show();
            $('#m').focus();
            ready = true;
        }

        return false;
    });

    socket.on('new', function(msg)
    {
        $('#chatbox').append('<div style="text-align: center; color: blue">' + msg)
    });

    $('#submitmsg').click(function()
    {
        var msgs = $('#m').val();
        socket.emit('chat message', msgs);
        $('#m').val('');

        return false;
    });
    socket.on('chat message', function(user, msg)
    {
        $('#chatbox').append($('<p>').text(user + ': ' + msg)).animate({
            "scrollTop": $('#chatbox')[0].scrollHeight
        }, "fast");

    });
}


