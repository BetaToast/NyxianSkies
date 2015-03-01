/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class TitleScreen extends Phaser.State {
        backgroundTiles: Array<Phaser.Sprite> = [];
        title: Phaser.Sprite;
        ship: Phaser.Sprite;
        music: Phaser.Sound;
        ui: BetaToast.UserInterface;
        btnOnePlayer: BetaToast.Button;
        btnTwoPlayer: BetaToast.Button;

        create() {
            for (var y = 0; y < 720; y += 256) {
                for (var x = 0; x < 1536; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }

            this.ship = this.add.sprite(-400, 462, 'playerShip1');
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.rotation = 90 * (Math.PI / 180);

            this.title = this.add.sprite(-400, 462, 'title');
            this.title.anchor.setTo(0.5, 0.5);

            this.music = this.add.audio('styx', 1, true);
            
            //this.music.play();

            this.ui = new BetaToast.UserInterface(this, "blue");
            this.btnOnePlayer = this.ui.addButton(-400, 462, "1 Player", 48, 8);
            this.btnOnePlayer.onClickAction = this.btnOnePlayerClick;
            this.btnOnePlayer.enabled = false;

            this.btnTwoPlayer = this.ui.addButton(-400, 462, "2 Player", 48, 8);
            this.btnTwoPlayer.onClickAction = this.btnTwoPlayerClick;
            this.btnTwoPlayer.enabled = false;

            var start = 250;
            var length = 2000;
            this.add.tween(this.ship).to({ x: this.world.centerX }, length, Phaser.Easing.Elastic.InOut, true, start);

            start += 750;
            length = 3000;
            this.add.tween(this.title).to({ x: this.world.centerX, y: 220 }, length, Phaser.Easing.Elastic.InOut, true, start);

            start += 250;
            this.add.tween(this.btnTwoPlayer.normalSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.hoverSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.clickSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.textSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.textSpriteShadow).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);

            start += 75;
            this.add.tween(this.btnOnePlayer.normalSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.hoverSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.clickSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.textSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.textSpriteShadow).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);

            //.onComplete.add(this.allowClick, this);
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

            this.add.tween(this.btnOnePlayer.normalSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.normalSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.hoverSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.hoverSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.clickSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.clickSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);

            this.add.tween(this.btnOnePlayer.textSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.textSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.textSpriteShadow).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.textSpriteShadow).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);

            var tween = this.add.tween(this.ship).to({ x: 1536 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            tween.onComplete.add(this.startShipSelectScreen, this);
        }

        allowClick() {
            this.btnOnePlayer.enabled = true;
            this.btnTwoPlayer.enabled = true;
        }

        btnOnePlayerClick(button) {
            button.parent.fadeOut();
        }

        btnTwoPlayerClick(button) {
            button.parent.fadeOut();
        }

        startShipSelectScreen() {
            this.game.state.start('ShipSelect', true, false);
        }
    }
}  