var BetaToast;
(function (BetaToast) {
    var Rect = (function () {
        function Rect(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }
        return Rect;
    })();
    BetaToast.Rect = Rect;
})(BetaToast || (BetaToast = {}));
var __extends = this.__extends || function (d, b) {
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
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);

            this.ui = new BetaToast.UserInterface(uiColor);
        }
        return Game;
    })(Phaser.Game);
    BetaToast.Game = Game;
})(BetaToast || (BetaToast = {}));
var BetaToast;
(function (BetaToast) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.readAllText = function (filename) {
            var ret = "";
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", filename, false);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        ret = rawFile.responseText;
                    }
                }
            };
            rawFile.send(null);
            return ret;
        };

        Utils.parseXml = function (xml) {
            var dom = (new DOMParser()).parseFromString(xml, "text/xml");
            return dom;
        };

        Utils.xml2json = function (xml) {
            var xmlDoc = this.parseXml(xml);
            var jsonStr = this.json2Str(this.setJsonObj(xmlDoc));
            return JSON.parse(jsonStr);
        };

        Utils.json2Str = function (js_obj) {
            var rejsn = JSON.stringify(js_obj, undefined, 2).replace(/(\\t|\\r|\\n)/g, '').replace(/"",[\n\t\r\s]+""[,]*/g, '').replace(/(\n[\t\s\r]*\n)/g, '').replace(/[\s\t]{2,}""[,]{0,1}/g, '').replace(/"[\s\t]{1,}"[,]{0,1}/g, '').replace(/\[[\t\s]*\]/g, '""');
            return (rejsn.indexOf('"parsererror": {') == -1) ? rejsn : 'Invalid XML format';
        };

        Utils.setJsonObj = function (xml) {
            var js_obj = {};
            if (xml.nodeType == 1) {
                if (xml.attributes.length > 0) {
                    js_obj["attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        js_obj["attributes"][attribute.nodeName] = attribute.value;
                    }
                }
            } else if (xml.nodeType == 3) {
                js_obj = xml.nodeValue;
            }
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (js_obj[nodeName]) == "undefined") {
                        js_obj[nodeName] = this.setJsonObj(item);
                    } else {
                        if (typeof (js_obj[nodeName].push) == "undefined") {
                            var old = js_obj[nodeName];
                            js_obj[nodeName] = [];
                            js_obj[nodeName].push(old);
                        }
                        js_obj[nodeName].push(this.setJsonObj(item));
                    }
                }
            }
            return js_obj;
        };
        return Utils;
    })();
    BetaToast.Utils = Utils;
})(BetaToast || (BetaToast = {}));
var BetaToast;
(function (BetaToast) {
    var Button = (function () {
        function Button() {
            this.state = 0 /* Normal */;
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        }
        return Button;
    })();
    BetaToast.Button = Button;
})(BetaToast || (BetaToast = {}));
var BetaToast;
(function (BetaToast) {
    var UserInterface = (function () {
        function UserInterface(uiColor) {
            this.uiColor = uiColor;
            this.sheetName = uiColor + "sheet";
            this.xmlFilename = "assets//ui//" + this.sheetName + ".xml";
            this.pngFilename = "assets//ui//" + this.sheetName + ".png";

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
            var ret = new BetaToast.Rect(x, y, w, h);
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
var NyxianSkies;
(function (NyxianSkies) {
    var NyxianSkiesGame = (function (_super) {
        __extends(NyxianSkiesGame, _super);
        function NyxianSkiesGame() {
            _super.call(this);
            //var button = new BetaToast.Button();
        }
        NyxianSkiesGame.prototype.create = function () {
        };
        return NyxianSkiesGame;
    })(BetaToast.Game);
    NyxianSkies.NyxianSkiesGame = NyxianSkiesGame;
})(NyxianSkies || (NyxianSkies = {}));
window.onload = function () {
    var game = new NyxianSkies.NyxianSkiesGame();
};
//# sourceMappingURL=game.js.map
