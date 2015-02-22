﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BetaToast;
(function (BetaToast) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(uiColor) {
            if (typeof uiColor === "undefined") { uiColor = "blue"; }
            _super.call(this, 1280, 720, Phaser.AUTO, 'content', null);

            this.ui = new BetaToast.UserInterface(uiColor);
        }
        return Game;
    })(Phaser.Game);
    BetaToast.Game = Game;
})(BetaToast || (BetaToast = {}));
//# sourceMappingURL=Game.js.map
