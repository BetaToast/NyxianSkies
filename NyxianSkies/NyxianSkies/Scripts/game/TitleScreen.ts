/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class TitleScreen extends Phaser.State {
        backgroundTiles: Array<Phaser.Sprite> = [];
        title: Phaser.Sprite;
        ship: Phaser.Sprite;
        music: Phaser.Sound;
        ui: BetaToast.UserInterface;

        create() {
            for (var y = 0; y < 720; y += 256) {
                for (var x = 0; x < 1536; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }

            this.ship = this.add.sprite(-256, 512, 'playerShip1_red');
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.rotation = 90 * (Math.PI / 180);

            this.title = this.add.sprite(this.world.centerX, -300, 'title');
            this.title.anchor.setTo(0.5, 0.5);

            this.add.tween(this.title).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.ship).to({ x: this.world.centerX }, 2000, Phaser.Easing.Elastic.InOut, true, 100);

            this.music = this.add.audio('styx', 1, true);
            this.music.play();

            this.input.onDown.addOnce(this.fadeOut, this);

            this.ui = new BetaToast.UserInterface(this, "blue");
            var btnOnePlayer = this.ui.addButton(348, 600, "1 Player", 48, 8);
            var btnTwoPlayer = this.ui.addButton(728, 600, "2 Player", 48, 8);
        }

        update() {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.x--;
                if (tile.x <= -256) tile.x = 1280;
            }

            this.ui.update();
        }

        fadeOut() {
            this.add.tween(this.title).to({ y: -512 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            var tween = this.add.tween(this.ship).to({ x: 1536 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
        }
    }
}  