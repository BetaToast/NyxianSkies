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
        NyxianSkies.NyxianSkiesGame.loadMap(level);
        hub.server.sendAction(JSON.stringify(
        {
            action: 'MapLoadedAndReady',
            playerId: PlayerId,
            gameId: GameId
        }));
    }

    hub.client.startLevel = function (level) {
        if (level !== undefined) {
            var a = 0;
        }
        hub.server.sendAction(JSON.stringify(
        {
            action: 'StartLevel',
            playerId: PlayerId,
            gameId: GameId
        }));
    }

    //hub.client.startLevel = function() {
    //    var a = 0;
    //}

    //Start the hub and wire up server call functions after it is started
    $.connection.hub.logging = true; //debugging
    $.connection.hub.start();
});