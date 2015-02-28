/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    import Utils = BetaToast.Utils;

    export class Gameplay extends Phaser.State {
        mapFilename: string;
        jsonMap: string;
        map: Map;
        bgLayer1Tiles: Array<Phaser.Sprite> = [];
        bgLayer2Tiles: Array<Phaser.Sprite> = [];
        gameObjects: Array<Phaser.Sprite> = [];


        create() {
            this.mapFilename = "assets//maps//earth.json";
            this.jsonMap = Utils.readAllText(this.mapFilename);
            this.map = new Map(this.jsonMap);

            // BG Color
            this.game.stage.setBackgroundColor(this.map.bgColor);

            // BG Layer 1
            if (this.map.bgLayer1 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = this.bgLayer1Tiles.length;
                        this.bgLayer1Tiles[index] = this.add.sprite(x, y, this.map.bgLayer1 + 'Background');
                    }
                }
            }

            // BG Layer 2
            if (this.map.bgLayer2 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = this.bgLayer2Tiles.length;
                        this.bgLayer2Tiles[index] = this.add.sprite(x, y, this.map.bgLayer2 + 'Background');
                    }
                }
            }

            // Game Objects
            for (var i = 0; i < this.map.gameObjects.length; i++) {
                var gameObject = this.map.gameObjects[i];
                var keyName = NyxianSkies.GameObjects.getTextureAtlasKeyFromId(gameObject.objectType) + ".png";
                var sprite = this.add.sprite(gameObject.x, gameObject.y, 'spritesheet', keyName);
                this.gameObjects[this.gameObjects.length] = sprite;
            }
        }

        update() {
            
        }
    }
}  