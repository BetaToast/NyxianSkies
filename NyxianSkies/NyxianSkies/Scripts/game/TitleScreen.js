/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NyxianSkies;
(function (NyxianSkies) {
    var TitleScreen = (function (_super) {
        __extends(TitleScreen, _super);
        function TitleScreen() {
            _super.apply(this, arguments);
            this.backgroundTiles = [];
        }
        TitleScreen.prototype.create = function () {
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
            var shipTween = this.add.tween(this.ship).to({ x: this.world.centerX }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            shipTween.onComplete.add(this.allowClick, this);
            this.music = this.add.audio('styx', 1, true);
            this.music.play();
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.btnOnePlayer = this.ui.addButton(348, 600, "1 Player", 48, 8);
            this.btnOnePlayer.onClickAction = this.btnOnePlayerClick;
            this.btnOnePlayer.enabled = false;
            this.btnTwoPlayer = this.ui.addButton(728, 600, "2 Player", 48, 8);
            this.btnTwoPlayer.onClickAction = this.btnTwoPlayerClick;
            this.btnTwoPlayer.enabled = false;
        };
        TitleScreen.prototype.update = function () {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.x--;
                if (tile.x <= -256)
                    tile.x = 1280;
            }
            this.ui.update();
        };
        TitleScreen.prototype.fadeOut = function () {
            this.add.tween(this.title).to({ y: -512 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.sprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.sprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.textSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.textSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.textSpriteShadow).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.textSpriteShadow).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            var tween = this.add.tween(this.ship).to({ x: 1536 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            tween.onComplete.add(this.startShipSelectScreen, this);
        };
        TitleScreen.prototype.allowClick = function () {
            this.btnOnePlayer.enabled = true;
            this.btnTwoPlayer.enabled = true;
        };
        TitleScreen.prototype.btnOnePlayerClick = function (button) {
            button.parent.fadeOut();
        };
        TitleScreen.prototype.btnTwoPlayerClick = function (button) {
            button.parent.fadeOut();
        };
        TitleScreen.prototype.startShipSelectScreen = function () {
            this.game.state.start('ShipSelect', true, false);
        };
        return TitleScreen;
    })(Phaser.State);
    NyxianSkies.TitleScreen = TitleScreen;
})(NyxianSkies || (NyxianSkies = {}));
//# sourceMappingURL=TitleScreen.js.map