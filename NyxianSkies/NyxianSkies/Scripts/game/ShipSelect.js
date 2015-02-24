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
    var ShipSelect = (function (_super) {
        __extends(ShipSelect, _super);
        function ShipSelect() {
            _super.apply(this, arguments);
            this.backgroundTiles = [];
            this.shipIndex = 1;
        }
        ShipSelect.prototype.create = function () {
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ship = this.add.sprite(this.world.centerX, 800, 'playerShip1');
            this.ship.anchor.setTo(0.5, 0.5);
            this.title = this.add.sprite(this.world.centerX, -300, 'selectShipText');
            this.title.anchor.setTo(0.5, 0.5);
            this.add.tween(this.ship).to({ y: 340 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            this.add.tween(this.ship.scale).to({ x: 2, y: 2 }, 2000, Phaser.Easing.Back.Out, true, 1000);
            this.add.tween(this.title).to({ y: 128 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.btnSelectLeft = this.ui.addSmallButton(460, 512, "<", 16, 12);
            this.btnSelectLeft.onClickAction = this.btnSelectLeftClick;
            this.btnSelectLeft.enabled = true;
            this.btnSelectRight = this.ui.addSmallButton(776, 512, ">", 16, 12);
            this.btnSelectRight.onClickAction = this.btnSelectRightClick;
            this.btnSelectRight.enabled = true;
            this.btnCancel = this.ui.addButton(64, 656, "Cancel", 48, 12);
            this.btnAccept = this.ui.addButton(1026, 656, "Start", 48, 12);
        };
        ShipSelect.prototype.update = function () {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.y++;
                if (tile.y >= 720)
                    tile.y = -256;
            }
            this.ui.update();
        };
        ShipSelect.prototype.btnSelectLeftClick = function (button) {
            button.parent.shipIndex--;
            if (button.parent.shipIndex <= 0)
                button.parent.shipIndex = 12;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
        };
        ShipSelect.prototype.btnSelectRightClick = function (button) {
            button.parent.shipIndex++;
            if (button.parent.shipIndex >= 13)
                button.parent.shipIndex = 1;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
        };
        return ShipSelect;
    })(Phaser.State);
    NyxianSkies.ShipSelect = ShipSelect;
})(NyxianSkies || (NyxianSkies = {}));
//# sourceMappingURL=ShipSelect.js.map