module BetaToast {
    export class UserInterface {
        uiColor: string;
        sheetName: string;
        xmlFilename: string;
        pngFilename: string;

        partRectBoxCheckmark: BetaToast.Rect;
        partRectBoxCross: BetaToast.Rect;
        partRectBoxTick: BetaToast.Rect;
        partRectButton00: BetaToast.Rect;
        partRectButton01: BetaToast.Rect;
        partRectButton02: BetaToast.Rect;
        partRectButton03: BetaToast.Rect;
        partRectButton04: BetaToast.Rect;
        partRectButton05: BetaToast.Rect;
        partRectButton06: BetaToast.Rect;
        partRectButton07: BetaToast.Rect;
        partRectButton08: BetaToast.Rect;
        partRectButton09: BetaToast.Rect;
        partRectButton10: BetaToast.Rect;
        partRectButton11: BetaToast.Rect;
        partRectButton12: BetaToast.Rect;
        partRectButton13: BetaToast.Rect;
        partRectCheckmark: BetaToast.Rect;
        partRectCircle: BetaToast.Rect;
        partRectCross: BetaToast.Rect;
        partRectPanel: BetaToast.Rect;
        partRectSliderDown: BetaToast.Rect;
        partRectSliderLeft: BetaToast.Rect;
        partRectSliderRight: BetaToast.Rect;
        partRectSliderUp: BetaToast.Rect;
        partRectTick: BetaToast.Rect;

        constructor(uiColor: string) {
            this.uiColor = uiColor;
            this.sheetName = uiColor + "sheet";
            this.xmlFilename = "assets//ui//" + this.sheetName + ".xml";
            this.pngFilename = "assets//ui//" + this.sheetName + ".png";

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

        getRectFromAtlas(textureAtlas, index): BetaToast.Rect {
            var attribs = textureAtlas.TextureAtlas.SubTexture[index].attributes;
            var x = attribs.x;
            var y = attribs.y;
            var w = attribs.width;
            var h = attribs.height;
            var ret = new BetaToast.Rect(x, y, w, h);
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