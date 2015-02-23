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
        function Game() {
            _super.call(this, 1280, 720, Phaser.AUTO, 'content', null);
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
            }
            else if (xml.nodeType == 3) {
                js_obj = xml.nodeValue;
            }
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (js_obj[nodeName]) == "undefined") {
                        js_obj[nodeName] = this.setJsonObj(item);
                    }
                    else {
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
            this.textStyle = {
                font: "22px Arial",
                fill: "#FFFFFF"
            };
            this.textShadowStyle = {
                font: "22px Arial",
                fill: "#000000"
            };
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
        };
        return Button;
    })();
    BetaToast.Button = Button;
})(BetaToast || (BetaToast = {}));
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
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/images/loader.png');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    NyxianSkies.Boot = Boot;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        return GameOver;
    })(Phaser.State);
    NyxianSkies.GameOver = GameOver;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        return Gameplay;
    })(Phaser.State);
    NyxianSkies.Gameplay = Gameplay;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
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
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(640 - 200, 360 - 20, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            // Load all of our assets here
            // Images
            this.load.image('spritesheet', 'assets/images/sheet.png');
            this.load.image('blueUISpriteSheet', 'assets/ui/blueSheet.png');
            this.load.image('greenUISpriteSheet', 'assets/ui/greenSheet.png');
            this.load.image('greyUISpriteSheet', 'assets/ui/greySheet.png');
            this.load.image('redUISpriteSheet', 'assets/ui/redSheet.png');
            this.load.image('yellowUISpriteSheet', 'assets/ui/yellowSheet.png');
            this.load.image('title', 'assets/images/title.png');
            this.load.image('blackBackground', 'assets/images/black.png');
            this.load.image('blueBackground', 'assets/images/blue.png');
            this.load.image('darkPurpleBackground', 'assets/images/darkPurple.png');
            this.load.image('purpleBackground', 'assets/images/purple.png');
            this.load.image('playerShip1_red', 'assets/images/playerShip1_red.png');
            this.load.spritesheet('blueUISpriteSheet-Button', 'assets/ui/blueSheet.png', 190, 49);
            // Audio
            this.load.audio('styx', 'assets/audio/styx.mp3');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startTitleScreen, this);
        };
        Preloader.prototype.startTitleScreen = function () {
            this.game.state.start('TitleScreen', true, false);
        };
        return Preloader;
    })(Phaser.State);
    NyxianSkies.Preloader = Preloader;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var ShipSelect = (function (_super) {
        __extends(ShipSelect, _super);
        function ShipSelect() {
            _super.apply(this, arguments);
        }
        return ShipSelect;
    })(Phaser.State);
    NyxianSkies.ShipSelect = ShipSelect;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var StageSelect = (function (_super) {
        __extends(StageSelect, _super);
        function StageSelect() {
            _super.apply(this, arguments);
        }
        return StageSelect;
    })(Phaser.State);
    NyxianSkies.StageSelect = StageSelect;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var TechSelect = (function (_super) {
        __extends(TechSelect, _super);
        function TechSelect() {
            _super.apply(this, arguments);
        }
        return TechSelect;
    })(Phaser.State);
    NyxianSkies.TechSelect = TechSelect;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var TitleScreen = (function (_super) {
        __extends(TitleScreen, _super);
        function TitleScreen() {
            _super.apply(this, arguments);
            this.backgroundTiles = [];
        }
        TitleScreen.prototype.create = function () {
            for (var y = 0; y < 720; y += 256) {
                for (var x = 0; x < 1536; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ship = this.add.sprite(-256, 512, 'playerShip1_red');
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.rotation = 90 * (Math.PI / 180);
            this.title = this.add.sprite(this.world.centerX, -300, 'title');
            this.title.anchor.setTo(0.5, 0.5);
            this.add.tween(this.title).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.ship).to({ x: this.world.centerX }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            this.music = this.add.audio('styx', 1, true);
            this.music.play();
            this.input.onDown.addOnce(this.fadeOut, this);
            this.ui = new BetaToast.UserInterface(this, "blue");
            var btnOnePlayer = this.ui.addButton(348, 600, "1 Player", 48, 8);
            var btnTwoPlayer = this.ui.addButton(728, 600, "2 Player", 48, 8);
        };
        TitleScreen.prototype.update = function () {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.x--;
                if (tile.x <= -256)
                    tile.x = 1280;
            }
            this.ui.update();
        };
        TitleScreen.prototype.fadeOut = function () {
            this.add.tween(this.title).to({ y: -512 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            var tween = this.add.tween(this.ship).to({ x: 1536 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
        };
        return TitleScreen;
    })(Phaser.State);
    NyxianSkies.TitleScreen = TitleScreen;
})(NyxianSkies || (NyxianSkies = {}));
window.onload = function () {
    var game = new NyxianSkies.NyxianSkiesGame();
};
//# sourceMappingURL=game.js.map