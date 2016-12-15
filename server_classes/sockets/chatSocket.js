/**
 * Created by Adison Lee on 12/15/16.
 */

"use strict";

class ChatSocket
{
    constructor ()
    {

    }

    connect (io, socket, users, games)
    {
        socket.on('connected', function (userName, room) {
            users[socket.id] = userName;
            io.emit('update', '*** ' + userName + ' joined the chat. ***');
            io.emit('update', userName + " joined the server.");
            //io.emit('update-users', users);

            socket.on('disconnect', function () {
                io.emit('update', '*** ' + users[socket.id] + ' left the chat. ***');
                io.emit('update', userName + " left the server.");
                console.log('*** ' + users[socket.id] + ' left the chat. ***');
                delete users[socket.id];
                delete  games[room];

                //io.emit('update-users', users);
            });
        });


        socket.on('chat message', function (msg) {
            io.emit('chat message', users[socket.id], msg);
            console.log('message: ' + users[socket.id] + ':' + msg);
        });
    }
}

module.exports = ChatSocket;