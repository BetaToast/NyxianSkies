/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class ShipSelect extends Phaser.State {
        backgroundTiles: Array<Phaser.Sprite> = [];
        ship: Phaser.Sprite;
        ui: BetaToast.UserInterface;
        title: Phaser.Sprite;

        create() {
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }

            this.ship = this.add.sprite(this.world.centerX, 800, 'playerShip1_red');
            this.ship.anchor.setTo(0.5, 0.5);

            this.title = this.add.sprite(this.world.centerX, -300, 'selectShipText');
            this.title.anchor.setTo(0.5, 0.5);

            this.add.tween(this.ship).to({ y: 340 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            this.add.tween(this.ship.scale).to({ x: 2, y: 2 }, 2000, Phaser.Easing.Back.Out, true, 1000);
            this.add.tween(this.title).to({ y: 128 }, 2000, Phaser.Easing.Elastic.Out, true, 0);

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