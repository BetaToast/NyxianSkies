var gameId;
var playerId;

var hub;
var canExecute = false;
var pingId;
$(function () {
    hub = $.connection.mainHub;


    hub.client.yourPlayerId = function (playerId) {
        this.playerId = playerId;
        canExecute = true;
    }

    hub.client.pong = function (id) {
        if (pingId == id) {
            var laspe = (new Date()).getTime() - pingId;
            $("#Latency").html(laspe + "ms");
        }
    }


    //Start the hub and wire up server call functions after it is started
    $.connection.hub.logging = true; //debugging
    $.connection.hub.start();
});