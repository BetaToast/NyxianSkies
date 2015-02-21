var gameId;
var playerId;

var hub;
var canExecute = false;

$(function () {
    hub = $.connection.mainHub;

    //Start the hub and wire up server call functions after it is started
    $.connection.hub.logging = true; //debugging

    hub.client.test = function() {

    }
    hub.client.yourPlayerId = function(playerId) {
        this.playerId = playerId;
    }

    $.connection.hub
        .start()
        .done(function () {
            canExecute = true;
        });
});