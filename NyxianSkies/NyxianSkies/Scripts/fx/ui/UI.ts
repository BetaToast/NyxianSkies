module BetaToast {
    export class UserInterface {
        uiColor: string;
        sheetName: string;
        xmlFilename: string;
        pngFilename: string;
        keyName: string;
        controls = [];
        parent: Phaser.State;

        partRectBoxCheckmark: Phaser.Rectangle;
        partRectBoxCross: Phaser.Rectangle;
        partRectBoxTick: Phaser.Rectangle;
        partRectButton00: Phaser.Rectangle;
        partRectButton01: Phaser.Rectangle;
        partRectButton02: Phaser.Rectangle;
        partRectButton03: Phaser.Rectangle;
        partRectButton04: Phaser.Rectangle;
        partRectButton05: Phaser.Rectangle;
        partRectButton06: Phaser.Rectangle;
        partRectButton07: Phaser.Rectangle;
        partRectButton08: Phaser.Rectangle;
        partRectButton09: Phaser.Rectangle;
        partRectButton10: Phaser.Rectangle;
        partRectButton11: Phaser.Rectangle;
        partRectButton12: Phaser.Rectangle;
        partRectButton13: Phaser.Rectangle;
        partRectCheckmark: Phaser.Rectangle;
        partRectCircle: Phaser.Rectangle;
        partRectCross: Phaser.Rectangle;
        partRectPanel: Phaser.Rectangle;
        partRectSliderDown: Phaser.Rectangle;
        partRectSliderLeft: Phaser.Rectangle;
        partRectSliderRight: Phaser.Rectangle;
        partRectSliderUp: Phaser.Rectangle;
        partRectTick: Phaser.Rectangle;

        constructor(parent: Phaser.State, uiColor: string) {
            this.parent = parent;
            this.uiColor = uiColor;
            this.sheetName = uiColor + "sheet";
            this.xmlFilename = "assets//ui//" + this.sheetName + ".xml";
            this.pngFilename = "assets//ui//" + this.sheetName + ".png";
            this.keyName = uiColor + "UISpriteSheet";

            var xmlstr = Utils.readAllText(this.xmlFilename);
            var textureAtlas = Utils.xml2json(xmlstr);

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

        getRectFromAtlas(textureAtlas, index): Phaser.Rectangle {
            var attribs = textureAtlas.TextureAtlas.SubTexture[index].attributes;
            var x = attribs.x;
            var y = attribs.y;
            var w = attribs.width;
            var h = attribs.height;
            var ret = new Phaser.Rectangle(x, y, w, h);
            return ret;
        }

        update() {
            for (var i = 0; i < this.controls.length; i++) {
                var control = this.controls[i];
                control.update();
            }
        }

        ///////////////////////////////////////
        // Add Control Methods
        ///////////////////////////////////////
        addButton(x: number, y: number, content: string, tx: number = 0, ty: number = 0) : BetaToast.Button {
            var ret = new BetaToast.Button();

            ret.parent = this.parent;
            ret.x = x;
            ret.y = y;

            ret.normalSprite = this.parent.add.sprite(ret.x, ret.y, 'spritesheet', 'blue_button04.png');
            ret.normalSprite.inputEnabled = true;
            ret.normalSprite.events.onInputOver.add(ret.onHover, ret);

            ret.hoverSprite = this.parent.add.sprite(ret.x, ret.y, 'spritesheet', 'blue_button00.png');
            ret.hoverSprite.visible = false;
            ret.hoverSprite.inputEnabled = true;
            ret.hoverSprite.events.onInputOut.add(ret.onLeave, ret);
            ret.hoverSprite.events.onInputDown.add(ret.onClick, ret);

            ret.clickSprite = this.parent.add.sprite(ret.x, ret.y, 'spritesheet', 'blue_button03.png');
            ret.clickSprite.visible = false;
            ret.clickSprite.inputEnabled = true;
            ret.clickSprite.events.onInputOut.add(ret.onLeave, ret);
            ret.clickSprite.events.onInputDown.add(ret.onClick, ret);
            ret.clickSprite.events.onInputUp.add(ret.onHover, ret);
            
            ret.content = content;
            var textX = x + tx;
            var textY = y + ty;
            ret.textSpriteShadow = this.parent.game.add.text(textX + 1, textY + 1, ret.content, ret.textShadowStyle);
            ret.textSprite = this.parent.game.add.text(textX, textY, ret.content, ret.textStyle);

            this.controls[this.controls.length] = ret;
            
            return ret;
        }

        addSmallButton(x: number, y: number, content: string, tx: number = 0, ty: number = 0): BetaToast.Button {
            var ret = new BetaToast.Button();

            ret.parent = this.parent;
            ret.x = x;
            ret.y = y;

            ret.normalSprite = this.parent.add.sprite(ret.x, ret.y, 'spritesheet', 'blue_button11.png');
            ret.normalSprite.inputEnabled = true;
            ret.normalSprite.events.onInputOver.add(ret.onHover, ret);

            ret.hoverSprite = this.parent.add.sprite(ret.x, ret.y, 'spritesheet', 'blue_button07.png');
            ret.hoverSprite.visible = false;
            ret.hoverSprite.inputEnabled = true;
            ret.hoverSprite.events.onInputOut.add(ret.onLeave, ret);
            ret.hoverSprite.events.onInputDown.add(ret.onClick, ret);

            ret.clickSprite = this.parent.add.sprite(ret.x, ret.y, 'spritesheet', 'blue_button08.png');
            ret.clickSprite.visible = false;
            ret.clickSprite.inputEnabled = true;
            ret.clickSprite.events.onInputOut.add(ret.onLeave, ret);
            ret.clickSprite.events.onInputDown.add(ret.onClick, ret);
            ret.clickSprite.events.onInputUp.add(ret.onHover, ret);

            ret.content = content;
            var textX = x + tx;
            var textY = y + ty;
            ret.textSpriteShadow = this.parent.game.add.text(textX + 1, textY + 1, ret.content, ret.textShadowStyle);
            ret.textSprite = this.parent.game.add.text(textX, textY, ret.content, ret.textStyle);

            this.controls[this.controls.length] = ret;

            return ret;
        }

        addConsole(x: number, y: number): BetaToast.Console {
            var ret = new BetaToast.Console();

            ret.parent = this.parent;
            ret.x = x;
            ret.y = y;

            this.controls[this.controls.length] = ret;

            return ret;
        }
    }

    ///////////////////////////////////////
    // Enumerations
    ///////////////////////////////////////

    export enum ControlState {
        Normal,
        Hover,
        Click
    };
} 