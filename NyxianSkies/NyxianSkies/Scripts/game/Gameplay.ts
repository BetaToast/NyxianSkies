/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    import Utils = BetaToast.Utils;

    export class Gameplay extends Phaser.State {
        ui: BetaToast.UserInterface;
        console: BetaToast.Console;
        i: number = 0;


        map: Map;
        mapFilename: string;
        jsonMap: string;
        bgLayer1Tiles: Array<Phaser.Sprite> = [];
        bgLayer2Tiles: Array<Phaser.Sprite> = [];
        bgDetails: Array<Phaser.Sprite> = [];
        gameObjects: Array<Phaser.Sprite> = [];

        create() {
            NyxianSkiesGame.currentState = this;
            this.ui = new BetaToast.UserInterface(this, "blue");

            this.console = this.ui.addConsole(0, 0);
            this.console.addLine(NyxianSkiesGame.currentMapName);

            this.loadMap(NyxianSkiesGame.currentMapName);

            if (NyxianSkiesGame.player2 == null) {
                var px = this.world.centerX;
                var py = this.world.height - (this.world.centerY / 2);
                NyxianSkiesGame.player1.createGraphics(this.game, px, py);
            } else {
                var px1 = this.world.centerX - (this.world.centerX / 2);
                var py1 = this.world.height - (this.world.centerY / 2);
                NyxianSkiesGame.player1.createGraphics(this.game, px1, py1);

                var px2 = this.world.centerX + (this.world.centerX / 2);
                var py2 = this.world.height - (this.world.centerY / 2);
                NyxianSkiesGame.player2.createGraphics(this.game, px2, py2);
            }
        }

        update() {
            var bgLayer1Tiles = this.bgLayer1Tiles;
            for (var i = 0; i < bgLayer1Tiles.length; i++) {
                var tile = bgLayer1Tiles[i];
                tile.y += NyxianSkiesGame.mapSpeed;
                //if (tile.y <= -256) tile.y = 976;
                if (tile.y >= 976) tile.y = -256;
            }

            var details = this.bgDetails;
            for (var i = 0; i < details.length; i++) {
                var detail = details[i];
                detail.y += NyxianSkiesGame.mapSpeed;
            }

            var gameObjects = this.gameObjects;
            for (var i = 0; i < gameObjects.length; i++) {
                var gameObject = gameObjects[i];
                gameObject.y += NyxianSkiesGame.mapSpeed;
                //if (tile.y >= 720) tile.y = -256;
            }

            //var obj = gameObjects[0];
            //this.console.changeLine(0, "Game Object [0]: [" + obj.x + ", " + obj.y + "]");
            this.console.changeLine(0, "Player 1: " + NyxianSkiesGame.player1.playerId);
            if(NyxianSkiesGame.player2 != null) this.console.changeLine(1, "Player 2: " + NyxianSkiesGame.player2.playerId);
            
            this.ui.update();
            if (NyxianSkiesGame.player1)
                NyxianSkiesGame.player1.update();
            if (NyxianSkiesGame.player2)
                NyxianSkiesGame.player2.update();
        }

        loadMap(mapKeyName) {
            this.map = null;
            this.mapFilename = "";
            this.jsonMap = "";
            this.bgLayer1Tiles = [];
            this.bgLayer2Tiles = [];
            this.bgDetails = [];
            this.gameObjects = [];

            this.mapFilename = "assets//maps//" + mapKeyName + ".json";
            this.jsonMap = Utils.readAllText(this.mapFilename);
            this.map = new Map(this.jsonMap);

            var map = this.map;
            var bgLayer1Tiles = this.bgLayer1Tiles;
            var bgLayer2Tiles = this.bgLayer2Tiles;
            var details = this.bgDetails;
            var gameObjects = this.gameObjects;

            // BG Color
            this.stage.setBackgroundColor(this.map.bgColor);

            // BG Layer 1
            if (map.bgLayer1 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer1Tiles.length;
                        bgLayer1Tiles[index] = this.add.sprite(x, y, map.bgLayer1 + 'Background');
                    }
                }
            }

            // BG Layer 2
            if (map.bgLayer2 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer2Tiles.length;
                        bgLayer2Tiles[index] = this.add.sprite(x, y, map.bgLayer2 + 'Background');
                    }
                }
            }

            // Background Details
            //for (var i = 0; i < map.bgDetails.length; i++) {
            //    var detail = map.bgDetails[i];
            //    var sprite = this.add.sprite(detail.x, detail.y, detail.asset);
            //    var index = details.length;
            //    if (map.direction === "Vertical") {
            //        sprite.y = sprite.y - map.height;
            //    }
            //    else if (map.direction === "Horizontal") {
            //        sprite.x = sprite.x + map.width;
            //    }
            //    details[index] = sprite;
            //}

            // Game Objects
            for (var i = 0; i < map.gameObjects.length; i++) {
                var gameObject = map.gameObjects[i];
                var gameObjectkeyName = GameObjects.getTextureAtlasKeyFromId(gameObject.objectType) + ".png";
                var sprite = this.add.sprite(gameObject.x, gameObject.y, 'spritesheet', gameObjectkeyName);
                var index = gameObjects.length;
                if (map.direction === "Vertical") {
                    sprite.y = sprite.y - map.height;
                }
                else if (map.direction === "Horizontal") {
                    sprite.x = sprite.x + map.width;
                }
                gameObjects[index] = sprite;
            }

            var hub = (<any>this.game).hub;
            hub.server.sendAction(JSON.stringify(
            {
                action: 'MapLoadedAndReady',
                playerId: (<any>this).PlayerId,
                gameId: (<any>this).GameId
            }));
        }
    }
}  