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
            //switch (this.state) {
            //    case ControlState.Normal:
            //        this.sprite.cropRect = this.normalRect;
            //        break;
            //    case ControlState.Hover:
            //        this.sprite.cropRect = this.hoverRect;
            //        break;
            //    case ControlState.Click:
            //        this.sprite.cropRect = this.clickRect;
            //        break;
            //}
            //this.sprite.updateCrop();
        };
        Button.prototype.onHover = function (button, pointer) {
            //this.state = ControlState.Hover;
        };
        Button.prototype.onLeave = function (button, pointer) {
            //this.state = ControlState.Normal;
        };
        Button.prototype.onClick = function (button, pointer) {
            //this.state = ControlState.Click;
            if (this.onClickAction != null && this.enabled)
                this.onClickAction(this);
        };
        return Button;
    })();
    BetaToast.Button = Button;
})(BetaToast || (BetaToast = {}));
//# sourceMappingURL=Button.js.map