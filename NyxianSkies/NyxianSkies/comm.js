var GameId;
var PlayerId;

var hub;
var canExecute = false;
var pingId;

$(function () {
    hub = $.connection.mainHub;


    hub.client.yourPlayerId = function (playerId) {
        PlayerId = playerId;
        canExecute = true;
    }

    hub.client.pong = function (id) {
        if (pingId == id) {
            var laspe = (new Date()).getTime() - pingId;
            $("#Latency").html(laspe + "ms");
        }
    }
    hub.client.joinedGame = function (gameId) {


    }

    hub.client.loadLevel = function (level) {
        //TODO:  Put in level loading logic
        //Load level with the name of level
        //send response to server when level load is complete and player is ready to play
        debugger;
        hub.server.sendAction(JSON.stringify(
                       {
                           action: 'MapLoadedAndReady',
                           playerId: PlayerId,
                           gameId: GameId
                       }));
    }

    hub.client.startLevel = function (level) {
        //TODO:  Start the ships on the level


    }
    //Start the hub and wire up server call functions after it is started
    $.connection.hub.logging = true; //debugging
    $.connection.hub.start();
});