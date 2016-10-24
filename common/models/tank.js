var pubsub = require('../../server/pubsub.js');
var loopback = require('loopback');

module.exports = function(Tank) {
    //Tank after save..

    Tank.observe('after save', function (ctx, next) {
        var socket = Tank.app.io;
        if(ctx.isNewInstance){
            //Now publishing the data..
            pubsub.publish(socket, {
                collectionName : 'Tank',
                data: ctx.instance,
                method: 'POST'
            });
        }else{
            //Now publishing the data..
            pubsub.publish(socket, {
                collectionName : 'Tank',
                data: ctx.instance,
                modelId: ctx.instance.id,
                method: 'PUT'
            });
        }

        //Calling the next middleware..
        next();
    }); //after save..
    //TankDetail before delete..
    Tank.observe("before delete", function(ctx, next){
        var socket = Tank.app.io;
        //Now publishing the data..
        pubsub.publish(socket, {
            collectionName : 'Tank',
            data: ctx.where.id,
            modelId: ctx.where.id,
            method: 'DELETE'
        });
        //move to next middleware..
        next();
    }); //before delete..
};
