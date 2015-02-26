/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class WaitingLobby extends Phaser.State {
        backgroundTiles: Array<Phaser.Sprite> = [];
        ship: Phaser.Sprite;
        ui: BetaToast.UserInterface;
        title: Phaser.Sprite;
        btnSelectLeft: BetaToast.Button;
        btnSelectRight: BetaToast.Button;
        btnCancel: BetaToast.Button;
        btnAccept: BetaToast.Button;
        shipIndex: number = 1;

    
        create() {
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.ship = this.add.sprite(this.world.centerX, this.world.height + 100, 'playerShip1');

            this.ship.anchor.setTo(0.5, 0.5);

            this.add.tween(this.ship).to({ y: -100 }, 8000, Phaser.Easing.Elastic.InOut, true, 100);
            this.add.tween(this.ship).to({ x: this.world.width - (this.world.width / 10), y: this.world.height -(this.world.height / 8 )}, 8000, Phaser.Easing.Elastic.InOut, true, 15000);
            this.add.tween(this.ship).to({ x: -100 , y: -100 }, 4000, Phaser.Easing.Elastic.InOut, true, 23000);

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