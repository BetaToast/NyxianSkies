/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    import Utils = BetaToast.Utils;

    export class NyxianSkiesGame extends BetaToast.Game {
        static map: Map;
        static mapFilename: string;
        static jsonMap: string;
        static bgLayer1Tiles: Array<Phaser.Sprite> = [];
        static bgLayer2Tiles: Array<Phaser.Sprite> = [];
        static gameObjects: Array<Phaser.Sprite> = [];
        static currentState;

        hub;

        constructor(hub) {
            super();

            this.hub = hub;

            // Add all of our screens here
            this.state.add('Boot', Boot, false);
            this.state.add('GameOver', GameOver, false);
            this.state.add('Gameplay', Gameplay, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('ShipSelect', ShipSelect, false);
            this.state.add('StageSelect', StageSelect, false);
            this.state.add('TechSelect', TechSelect, false);
            this.state.add('TitleScreen', TitleScreen, false);
            this.state.add('WaitingLobby', WaitingLobby, false);

            // Start Boot screen
            this.state.start('Boot');
        }

        static loadMap(mapKeyName) {
            NyxianSkiesGame.map = null;
            NyxianSkiesGame.mapFilename = "";
            NyxianSkiesGame.jsonMap = "";
            NyxianSkiesGame.bgLayer1Tiles = [];
            NyxianSkiesGame.bgLayer2Tiles = [];
            NyxianSkiesGame.gameObjects = [];
            
            NyxianSkiesGame.mapFilename = "assets//maps//" + mapKeyName + ".json";
            NyxianSkiesGame.jsonMap = Utils.readAllText(this.mapFilename);
            NyxianSkiesGame.map = new Map(this.jsonMap);

            var state = NyxianSkiesGame.currentState;
            var map = NyxianSkiesGame.map;
            var bgLayer1Tiles = NyxianSkiesGame.bgLayer1Tiles;
            var bgLayer2Tiles = NyxianSkiesGame.bgLayer2Tiles;
            var gameObjects = NyxianSkiesGame.gameObjects;

            // BG Color
            state.stage.setBackgroundColor(this.map.bgColor);

            // BG Layer 1
            if (map.bgLayer1 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer1Tiles.length;
                        bgLayer1Tiles[index] = state.add.sprite(x, y, map.bgLayer1 + 'Background');
                        bgLayer1Tiles[index].visible = false;
                    }
                }
            }

            // BG Layer 2
            if (map.bgLayer2 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer2Tiles.length;
                        bgLayer2Tiles[index] = state.add.sprite(x, y, map.bgLayer2 + 'Background');
                        bgLayer2Tiles[index].visible = false;
                    }
                }
            }

            // Game Objects
            for (var i = 0; i < map.gameObjects.length; i++) {
                var gameObject = map.gameObjects[i];
                var gameObjectkeyName = GameObjects.getTextureAtlasKeyFromId(gameObject.objectType) + ".png";
                var sprite = state.add.sprite(gameObject.x, gameObject.y, 'spritesheet', gameObjectkeyName);
                var index = gameObjects.length;
                gameObjects[index] = sprite;
                gameObjects[index].visible = false;
            }
        }

        static setMapVisibility(value) {
            var bgLayer1Tiles = NyxianSkiesGame.bgLayer1Tiles;
            var bgLayer2Tiles = NyxianSkiesGame.bgLayer2Tiles;
            var gameObjects = NyxianSkiesGame.gameObjects;

            for (var i = 0; i < bgLayer1Tiles.length; i++) {
                bgLayer1Tiles[i].visible = value;
            }

            for (var i = 0; i < bgLayer2Tiles.length; i++) {
                bgLayer2Tiles[i].visible = value;
            }

            for (var i = 0; i < gameObjects.length; i++) {
                gameObjects[i].visible = value;
            }
        }

        static showMap() {
            NyxianSkiesGame.setMapVisibility(true);
        }

        static hideMap() {
            NyxianSkiesGame.setMapVisibility(false);
        }
    }
}