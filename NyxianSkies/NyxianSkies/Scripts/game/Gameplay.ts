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

        player1Ship: Phaser.Sprite;

        upKey: Phaser.Key;
        downKey: Phaser.Key;
        leftKey: Phaser.Key;
        rightKey: Phaser.Key;
        shipSpeed: number = 8;
        
        create() {
            NyxianSkiesGame.currentState = this;
            this.ui = new BetaToast.UserInterface(this, "blue");

            this.console = this.ui.addConsole(0, 0);
            this.console.addLine("Hello World");

            this.loadMap("Earth");

            var shipKey = NyxianSkiesGame.getPlayerShipAtlasKey(NyxianSkiesGame.shipType);
            this.player1Ship = this.add.sprite(this.world.centerX, this.world.height - (this.world.centerY / 2), 'spritesheet', shipKey);
            this.player1Ship.anchor.setTo(0.5, 0.5);

            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        }

        update() {
            var bgLayer1Tiles = this.bgLayer1Tiles;
            for (var i = 0; i < bgLayer1Tiles.length; i++) {
                var tile = bgLayer1Tiles[i];
                tile.y += 2;
                //if (tile.y <= -256) tile.y = 976;
                if (tile.y >= 976) tile.y = -256;
            }

            var gameObjects = this.gameObjects;
            for (var i = 0; i < gameObjects.length; i++) {
                var gameObject = gameObjects[i];
                gameObject.y++;
                //if (tile.y >= 720) tile.y = -256;
            }

            //var obj = gameObjects[0];
            //this.console.changeLine(0, "Game Object [0]: [" + obj.x + ", " + obj.y + "]");
            
            this.ui.update();

            if (this.upKey.isDown) {
                this.player1Ship.y -= this.shipSpeed;
            }
            else if (this.downKey.isDown) {
                this.player1Ship.y += this.shipSpeed;
            }

            if (this.leftKey.isDown) {
                this.player1Ship.x -= this.shipSpeed;
            }
            else if (this.rightKey.isDown) {
                this.player1Ship.x += this.shipSpeed;
            }
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
        }
    }
}  