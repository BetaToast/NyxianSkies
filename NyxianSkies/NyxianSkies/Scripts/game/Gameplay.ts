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
        gameObjects: Array<Phaser.Sprite> = [];
        
        create() {
            NyxianSkiesGame.currentState = this;
            this.ui = new BetaToast.UserInterface(this, "blue");

            this.console = this.ui.addConsole(0, 0);
            this.console.addLine("Hello World");

            this.loadMap("Earth");
            //NyxianSkiesGame.showMap();
        }

        update() {
            var bgLayer1Tiles = this.bgLayer1Tiles;
            for (var i = 0; i < bgLayer1Tiles.length; i++) {
                var tile = bgLayer1Tiles[i];
                tile.y--;
                if (tile.y <= -256) tile.y = 976;
            }

            var gameObjects = this.gameObjects;
            for (var i = 0; i < gameObjects.length; i++) {
                var gameObject = gameObjects[i];
                gameObject.y++;
                //if (tile.y >= 720) tile.y = -256;
            }

            //var tile = NyxianSkiesGame.bgLayer1Tiles[0];
            //this.console.changeLine(0, "Tile [0]: [" + tile.x + ", " + tile.y + "]");

            this.ui.update();
        }

        loadMap(mapKeyName) {
            this.map = null;
            this.mapFilename = "";
            this.jsonMap = "";
            this.bgLayer1Tiles = [];
            this.bgLayer2Tiles = [];
            this.gameObjects = [];

            this.mapFilename = "assets//maps//" + mapKeyName + ".json";
            this.jsonMap = Utils.readAllText(this.mapFilename);
            this.map = new Map(this.jsonMap);

            var map = this.map;
            var bgLayer1Tiles = this.bgLayer1Tiles;
            var bgLayer2Tiles = this.bgLayer2Tiles;
            var gameObjects = this.gameObjects;

            // BG Color
            this.stage.setBackgroundColor(this.map.bgColor);

            // BG Layer 1
            if (map.bgLayer1 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer1Tiles.length;
                        bgLayer1Tiles[index] = this.add.sprite(x, y, map.bgLayer1 + 'Background');
                        //bgLayer1Tiles[index].visible = false;
                    }
                }
            }

            // BG Layer 2
            if (map.bgLayer2 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer2Tiles.length;
                        bgLayer2Tiles[index] = this.add.sprite(x, y, map.bgLayer2 + 'Background');
                        //bgLayer2Tiles[index].visible = false;
                    }
                }
            }

            // Game Objects
            for (var i = 0; i < map.gameObjects.length; i++) {
                var gameObject = map.gameObjects[i];
                var gameObjectkeyName = GameObjects.getTextureAtlasKeyFromId(gameObject.objectType) + ".png";
                var sprite = this.add.sprite(gameObject.x, gameObject.y, 'spritesheet', gameObjectkeyName);
                var index = gameObjects.length;
                gameObjects[index] = sprite;
                //gameObjects[index].visible = false;
            }
        }
    }
}  