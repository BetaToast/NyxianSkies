/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class ShipSelect extends Phaser.State {
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
            this.btnAccept.onClickAction = this.btnAcceptOnClick;

        }

        update() {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.y++;
                if (tile.y >= 720) tile.y = -256;
            }

            this.ui.update();
        }

        btnAcceptOnClick(button) {
            var shipId = button.parent.ship.key;
            button.parent.game.state.start('WaitingLobby', true, false);
        }

        btnSelectLeftClick(button) {
            button.parent.shipIndex--;
            if (button.parent.shipIndex <= 0) button.parent.shipIndex = 12;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
        }

        btnSelectRightClick(button) {
            button.parent.shipIndex++;
            if (button.parent.shipIndex >= 13) button.parent.shipIndex = 1;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
        }
    }
}  