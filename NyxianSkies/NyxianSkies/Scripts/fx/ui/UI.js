var BetaToast;
(function (BetaToast) {
    var UserInterface = (function () {
        function UserInterface(parent, uiColor) {
            this.controls = [];
            this.parent = parent;
            this.uiColor = uiColor;
            this.sheetName = uiColor + "sheet";
            this.xmlFilename = "assets//ui//" + this.sheetName + ".xml";
            this.pngFilename = "assets//ui//" + this.sheetName + ".png";
            this.keyName = uiColor + "UISpriteSheet";
            var xmlstr = BetaToast.Utils.readAllText(this.xmlFilename);
            var textureAtlas = BetaToast.Utils.xml2json(xmlstr);
            this.partRectBoxCheckmark = this.getRectFromAtlas(textureAtlas, 0);
            this.partRectBoxCross = this.getRectFromAtlas(textureAtlas, 1);
            this.partRectBoxTick = this.getRectFromAtlas(textureAtlas, 2);
            this.partRectButton00 = this.getRectFromAtlas(textureAtlas, 3);
            this.partRectButton01 = this.getRectFromAtlas(textureAtlas, 4);
            this.partRectButton02 = this.getRectFromAtlas(textureAtlas, 5);
            this.partRectButton03 = this.getRectFromAtlas(textureAtlas, 6);
            this.partRectButton04 = this.getRectFromAtlas(textureAtlas, 7);
            this.partRectButton05 = this.getRectFromAtlas(textureAtlas, 8);
            this.partRectButton06 = this.getRectFromAtlas(textureAtlas, 9);
            this.partRectButton07 = this.getRectFromAtlas(textureAtlas, 10);
            this.partRectButton08 = this.getRectFromAtlas(textureAtlas, 11);
            this.partRectButton09 = this.getRectFromAtlas(textureAtlas, 12);
            this.partRectButton10 = this.getRectFromAtlas(textureAtlas, 13);
            this.partRectButton11 = this.getRectFromAtlas(textureAtlas, 14);
            this.partRectButton12 = this.getRectFromAtlas(textureAtlas, 15);
            this.partRectButton13 = this.getRectFromAtlas(textureAtlas, 16);
            this.partRectCheckmark = this.getRectFromAtlas(textureAtlas, 17);
            this.partRectCircle = this.getRectFromAtlas(textureAtlas, 18);
            this.partRectCross = this.getRectFromAtlas(textureAtlas, 19);
            this.partRectPanel = this.getRectFromAtlas(textureAtlas, 20);
            this.partRectSliderDown = this.getRectFromAtlas(textureAtlas, 21);
            this.partRectSliderLeft = this.getRectFromAtlas(textureAtlas, 22);
            this.partRectSliderRight = this.getRectFromAtlas(textureAtlas, 23);
            this.partRectSliderUp = this.getRectFromAtlas(textureAtlas, 24);
            this.partRectTick = this.getRectFromAtlas(textureAtlas, 25);
        }
        UserInterface.prototype.getRectFromAtlas = function (textureAtlas, index) {
            var attribs = textureAtlas.TextureAtlas.SubTexture[index].attributes;
            var x = attribs.x;
            var y = attribs.y;
            var w = attribs.width;
            var h = attribs.height;
            var ret = new Phaser.Rectangle(x, y, w, h);
            return ret;
        };
        UserInterface.prototype.update = function () {
            for (var i = 0; i < this.controls.length; i++) {
                var control = this.controls[i];
                control.update();
            }
        };
        ///////////////////////////////////////
        // Add Control Methods
        ///////////////////////////////////////
        UserInterface.prototype.addButton = function (x, y, content, tx, ty) {
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            var ret = new BetaToast.Button();
            ret.normalRect = this.partRectButton04;
            ret.hoverRect = this.partRectButton00;
            ret.clickRect = this.partRectButton03;
            ret.x = x;
            ret.y = y;
            ret.width = ret.normalRect.width;
            ret.height = ret.normalRect.height;
            ret.content = content;
            ret.sprite = this.parent.add.sprite(ret.x, ret.y, this.keyName);
            ret.parent = this.parent;
            ret.sprite.inputEnabled = true;
            ret.sprite.crop(ret.normalRect, false);
            ret.sprite.events.onInputOver.add(ret.onHover, ret);
            ret.sprite.events.onInputOut.add(ret.onLeave, ret);
            ret.sprite.events.onInputDown.add(ret.onClick, ret);
            var textX = x + tx;
            var textY = y + ty;
            ret.textSpriteShadow = this.parent.game.add.text(textX + 1, textY + 1, ret.content, ret.textShadowStyle);
            ret.textSprite = this.parent.game.add.text(textX, textY, ret.content, ret.textStyle);
            this.controls[this.controls.length] = ret;
            return ret;
        };
        return UserInterface;
    })();
    BetaToast.UserInterface = UserInterface;
    ///////////////////////////////////////
    // Enumerations
    ///////////////////////////////////////
    (function (ControlState) {
        ControlState[ControlState["Normal"] = 0] = "Normal";
        ControlState[ControlState["Hover"] = 1] = "Hover";
        ControlState[ControlState["Click"] = 2] = "Click";
    })(BetaToast.ControlState || (BetaToast.ControlState = {}));
    var ControlState = BetaToast.ControlState;
    ;
})(BetaToast || (BetaToast = {}));
//# sourceMappingURL=UI.js.map