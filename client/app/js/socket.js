'use strict';
angular.module('SamoaApp')
    //Here LoopBackAuth service must be provided as argument for authenticating the user
    .factory('socket', function(LoopBackAuth){
        //Creating connection with server

        var socket = io.connect('http://localhost:3000',{transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']});

        socket.on("error",function(err){
            console.log(err)
        })
        socket.on("disconnect",function(di){
            console.log(di)
        })



        //This part is only for login users for authenticated socket connection between client and server.
        //If you are not using login page in you website then you should remove rest piece of code..
        /*var id = LoopBackAuth.accessTokenId;
        var userId = LoopBackAuth.currentUserId;
        socket.on('connect', function(){
            socket.emit('authentication', {id: id, userId: userId });
            socket.on('authenticated', function() {
                // use the socket as usual
                console.log('User is authenticated');
            });
        });*/

        return socket;
    });
