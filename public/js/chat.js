/*
    Credit to Socket IO chat tutorial provided 
    by http://socket.io/get-started/chat//
    and John Roberts example https://github.com/SFSU-CSC-667/socket-io-example
*/

// DOM Ready =============================================================
$(document).ready(function () {
    $('#chatbox').hide();
    $('#formid').hide();
    $('#name').focus();
    chatSocketIO();
});


function chatSocketIO() {
    var socket = io();

    $('#name-form').find('button').click(event => {
        userName = $('#name').val();
        if (userName != '') {
            var room = getParameterByName('gameid');
            socket.emit('connected', userName, room);
            $('#name-form').hide();
            $('#chatbox').show();
            $('#formid').show();
            $('#m').focus();
            ready = true;
        }

        return false;
    });

    socket.on('update', function (msg) {
        $('#chatbox').append('<div style="text-align: center; color: blue">' + msg).animate({
            "scrollTop": $('#chatbox')[0].scrollHeight
        }, "fast");
    });

    $('#submitmsg').click(function () {
        var msgs = $('#m').val();
        socket.emit('chat message', msgs);
        $('#m').val('');

        return false;
    });
    socket.on('chat message', function (user, msg) {
        $('#chatbox').append($('<p>').text(user + ': ' + msg)).animate({
            "scrollTop": $('#chatbox')[0].scrollHeight
        }, "fast");

    });

}


