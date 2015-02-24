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
    var NyxianSkiesGame = (function (_super) {
        __extends(NyxianSkiesGame, _super);
        function NyxianSkiesGame() {
            _super.call(this);
            // Add all of our screens here
            this.state.add('Boot', NyxianSkies.Boot, false);
            this.state.add('GameOver', NyxianSkies.GameOver, false);
            this.state.add('Gameplay', NyxianSkies.Gameplay, false);
            this.state.add('Preloader', NyxianSkies.Preloader, false);
            this.state.add('ShipSelect', NyxianSkies.ShipSelect, false);
            this.state.add('StageSelect', NyxianSkies.StageSelect, false);
            this.state.add('TechSelect', NyxianSkies.TechSelect, false);
            this.state.add('TitleScreen', NyxianSkies.TitleScreen, false);
            // Start Boot screen
            this.state.start('Boot');
        }
        return NyxianSkiesGame;
    })(BetaToast.Game);
    NyxianSkies.NyxianSkiesGame = NyxianSkiesGame;
})(NyxianSkies || (NyxianSkies = {}));
//# sourceMappingURL=NyxianSkiesGame.js.map