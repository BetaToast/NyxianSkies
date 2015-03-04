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
    var WaitingLobby = (function (_super) {
        __extends(WaitingLobby, _super);
        function WaitingLobby() {
            _super.apply(this, arguments);
            this.backgroundTiles = [];
        }
        WaitingLobby.prototype.create = function () {
            NyxianSkies.NyxianSkiesGame.currentState = this;
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ui = new BetaToast.UserInterface(this, "blue");
        };
        WaitingLobby.prototype.update = function () {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.y++;
                if (tile.y >= 720)
                    tile.y = -256;
            }
            this.ui.update();
            //if (NyxianSkies.NyxianSkiesGame.map !== null) {
            //    var game = <NyxianSkiesGame> this.game;
            //game.hub.client.startLevel();
            this.game.state.start('Gameplay', true, false);
            //}
        };
        return WaitingLobby;
    })(Phaser.State);
    NyxianSkies.WaitingLobby = WaitingLobby;
})(NyxianSkies || (NyxianSkies = {}));
//# sourceMappingURL=WaitingLobby.js.map