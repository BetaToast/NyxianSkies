var BetaToast;
(function (BetaToast) {
    var Button = (function () {
        function Button() {
            this.state = 0 /* Normal */;
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.onClickAction = null;
            this.textStyle = {
                font: "22px Arial",
                fill: "#FFFFFF"
            };
            this.textShadowStyle = {
                font: "22px Arial",
                fill: "#000000"
            };
            this.enabled = true;
        }
        Button.prototype.update = function () {
            this.normalSprite.visible = false;
            this.hoverSprite.visible = false;
            this.clickSprite.visible = false;
            switch (this.state) {
                case 0 /* Normal */:
                    this.normalSprite.visible = true;
                    break;
                case 1 /* Hover */:
                    this.hoverSprite.visible = true;
                    break;
                case 2 /* Click */:
                    this.clickSprite.visible = true;
                    break;
            }
        };
        Button.prototype.onHover = function (button, pointer) {
            this.state = 1 /* Hover */;
        };
        Button.prototype.onLeave = function (button, pointer) {
            this.state = 0 /* Normal */;
        };
        Button.prototype.onClick = function (button, pointer) {
            this.state = 2 /* Click */;
            if (this.onClickAction != null && this.enabled)
                this.onClickAction(this);
        };
        return Button;
    })();
    BetaToast.Button = Button;
})(BetaToast || (BetaToast = {}));
//# sourceMappingURL=Button.js.map