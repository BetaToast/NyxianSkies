/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />

declare var hub: MainHub;
declare var GameId: Guid;
declare var PlayerId: Guid;
var canExecute = false;
var pingId;

$(() => {
    hub = $.connection.mainHub;

    hub.client.yourPlayerId = playerId => {
        PlayerId = playerId;
        canExecute = true;
    }

    hub.client.pong = (id, version) => {
        if (pingId == id) {
            var laspe = (new Date()).getTime() - pingId;
            $("#Latency").html(laspe + "ms");
        }
        NyxianSkies.NyxianSkiesGame.version = version;
    }

    hub.client.joinedGame = (gameId, playerId) => {
        GameId = gameId;
        if ((NyxianSkies.NyxianSkiesGame.player1 && NyxianSkies.NyxianSkiesGame.player1.playerId === playerId) ||
        (NyxianSkies.NyxianSkiesGame.player2 && NyxianSkies.NyxianSkiesGame.player2.playerId === playerId)) {
        }
        else if (!NyxianSkies.NyxianSkiesGame.player1 )
            NyxianSkies.NyxianSkiesGame.player1 = new NyxianSkies.Player(NyxianSkies.NyxianSkiesGame.shipType, playerId);
        else if (!NyxianSkies.NyxianSkiesGame.player2)
            NyxianSkies.NyxianSkiesGame.player2 = new NyxianSkies.Player(NyxianSkies.NyxianSkiesGame.shipType, playerId);
    }

    hub.client.loadLevel = level => {
        NyxianSkies.NyxianSkiesGame.currentState.state.start('Gameplay', true, false);
        hub.server.sendAction(JSON.stringify(
            {
                action: 'StartLevel',
                playerId: PlayerId,
                gameId: GameId
            }));
    }


    hub.client.shipPostionUpdate = (playerId, position, velocity) => {
        var player1 = NyxianSkies.NyxianSkiesGame.player1;
        var player2 = NyxianSkies.NyxianSkiesGame.player2;

        if (player1
            && player1.sprite
            && player1.playerId === playerId
            && (player1.sprite.x !== position.X || player1.sprite.y !== position.Y)) {
            //NyxianSkies.NyxianSkiesGame.player1.sprite.x = position.X;
            //NyxianSkies.NyxianSkiesGame.player1.sprite.y = position.Y;
            NyxianSkies.NyxianSkiesGame.player1.moveTo(position.X, position.Y);
        } else
            if (player2
                && player2.sprite
                && player2.playerId === playerId
                && (player2.sprite.x !== position.X || player2.sprite.y !== position.Y)) {
                //NyxianSkies.NyxianSkiesGame.player2.sprite.x = position.X;
                //NyxianSkies.NyxianSkiesGame.player2.sprite.y = position.Y;
                NyxianSkies.NyxianSkiesGame.player2.moveTo(position.X, position.Y);
            }
    }

    //Start the hub and wire up server call functions after it is started
    //$.connection.hub.logging = true; //debugging
    $.connection.hub.start();

});