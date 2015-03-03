/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/signalr/signalr.d.ts" />
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
        GameId = gameId;
    }

    hub.client.loadLevel = function (level) {
        //NyxianSkies.NyxianSkiesGame. game.state.start('Gameplay', true, false);
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


    //Start the hub and wire up server call functions after it is started
    $.connection.hub.logging = true; //debugging
    $.connection.hub.start();
});

