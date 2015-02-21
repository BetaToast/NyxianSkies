var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestApp;
(function (TestApp) {
    var TestGame = (function (_super) {
        __extends(TestGame, _super);
        function TestGame() {
            _super.call(this);
            //var button = new BetaToast.Button();
        }
        TestGame.prototype.create = function () {
        };
        return TestGame;
    })(BetaToast.Game);
    TestApp.TestGame = TestGame;
})(TestApp || (TestApp = {}));
//# sourceMappingURL=NyxianSkiesGame.js.map