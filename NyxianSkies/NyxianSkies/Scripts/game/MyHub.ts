/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />

declare var hub: MainHub;
declare var GameId: Guid;
declare var PlayerId: Guid;
var canExecute = false;
var pingId;

$(function () {
    hub = $.connection.mainHub;

    hub.client.yourPlayerId = playerId => {
        PlayerId = playerId;
        canExecute = true;
    }

    hub.client.pong = id => {
        if (pingId == id) {
            var laspe = (new Date()).getTime() - pingId;
            $("#Latency").html(laspe + "ms");
        }
    }
    hub.client.joinedGame = gameId => {
        GameId = gameId;
    }

    hub.client.loadLevel = level => {
        NyxianSkies.NyxianSkiesGame.currentState.state.start('Gameplay', true, false);
    }

    hub.client.startLevel = level => {
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

    hub.client.shipPostionUpdate = (playerId, position, velocity) => {
        //NyxianSkies.NyxianSkiesGame.currentState.state.Gameplay.player1
    }

    //Start the hub and wire up server call functions after it is started
    //$.connection.hub.logging = true; //debugging
    $.connection.hub.start();

});

