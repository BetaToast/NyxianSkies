/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class WaitingLobby extends Phaser.State {
        backgroundTiles: Array<Phaser.Sprite> = [];
        ui: BetaToast.UserInterface;
        title: Phaser.Sprite;


        create() {
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ui = new BetaToast.UserInterface(this, "blue");

        }

        update() {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.y++;
                if (tile.y >= 720) tile.y = -256;
            }

            this.ui.update();
        }

    }
}  