var BetaToast;
(function (BetaToast) {
    var Console = (function () {
        function Console() {
            this.x = 0;
            this.y = 0;
            this.lines = [];
            this.sprites = [];
            this.fontSize = 22;
            this.textStyle = {
                font: "22px Arial",
                fill: "#FFFFFF"
            };
            this.enabled = true;
        }
        Console.prototype.update = function () {
            for (var i = 0; i < this.lines.length; i++) {
                var sprite = this.sprites[i];
                var line = this.lines[i];
                if (sprite === undefined) {
                    sprite = this.parent.game.add.text(this.x, this.y + (i * this.fontSize), line, this.textStyle);
                    this.sprites[i] = sprite;
                }
            }
        };
        Console.prototype.addLine = function (value) {
            this.lines[this.lines.length] = value;
        };
        Console.prototype.changeLine = function (line, value) {
            this.lines[line] = value;
            if (this.sprites[line] !== undefined)
                this.sprites[line].setText(value);
            else
                this.sprites[line] = this.parent.game.add.text(this.x, this.y + (line * this.fontSize), value, this.textStyle);
        };
        return Console;
    })();
    BetaToast.Console = Console;
})(BetaToast || (BetaToast = {}));
//# sourceMappingURL=Console.js.map