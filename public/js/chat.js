/**
 * Created by adisonlee on 11/21/16.
 */

// DOM Ready =============================================================
$(document).ready(function()
{
    $('#chatbox').hide();
    $('#formid').hide();
    $('#name').focus();
    chatSocketIO();

});


function chatSocketIO()
{
    var socket = io();

    $('#name-form button').click(event =>
    {
        userName = $('#name').val();
        if(userName != '')
        {
            socket.emit('connected', userName);
            $('#name-form').hide();
            $('#chatbox').show();
            $('#formid').show();
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


