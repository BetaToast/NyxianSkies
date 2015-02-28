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
        };
        UserInterface.prototype.addSmallButton = function (x, y, content, tx, ty) {
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
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
            this.state.add('WaitingLobby', NyxianSkies.WaitingLobby, false);
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
            //this.load.image('spritesheet', 'assets/images/sheet.png');
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
            this.load.image('selectShipText', 'assets/images/selectship.png');
            this.load.image('playerShip1', 'assets/images/playerShip1_red.png');
            this.load.image('playerShip2', 'assets/images/playerShip1_blue.png');
            this.load.image('playerShip3', 'assets/images/playerShip1_green.png');
            this.load.image('playerShip4', 'assets/images/playerShip1_orange.png');
            this.load.image('playerShip5', 'assets/images/playerShip2_red.png');
            this.load.image('playerShip6', 'assets/images/playerShip2_blue.png');
            this.load.image('playerShip7', 'assets/images/playerShip2_green.png');
            this.load.image('playerShip8', 'assets/images/playerShip2_orange.png');
            this.load.image('playerShip9', 'assets/images/playerShip3_red.png');
            this.load.image('playerShip10', 'assets/images/playerShip3_blue.png');
            this.load.image('playerShip11', 'assets/images/playerShip3_green.png');
            this.load.image('playerShip12', 'assets/images/playerShip3_orange.png');
            this.load.atlasJSONHash('spritesheet', 'assets/images/nyxianskies-spritesheet.png', 'assets/images/nyxianskies-hash.json');
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
            this.backgroundTiles = [];
            this.shipIndex = 1;
        }
        ShipSelect.prototype.create = function () {
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ship = this.add.sprite(this.world.centerX, 800, 'playerShip1');
            this.ship.anchor.setTo(0.5, 0.5);
            this.title = this.add.sprite(this.world.centerX, -300, 'selectShipText');
            this.title.anchor.setTo(0.5, 0.5);
            this.add.tween(this.ship).to({ y: 340 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            this.add.tween(this.ship.scale).to({ x: 2, y: 2 }, 2000, Phaser.Easing.Back.Out, true, 1000);
            this.add.tween(this.title).to({ y: 128 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.btnSelectLeft = this.ui.addSmallButton(460, 512, "<", 16, 12);
            this.btnSelectLeft.onClickAction = this.btnSelectLeftClick;
            this.btnSelectLeft.enabled = true;
            this.btnSelectRight = this.ui.addSmallButton(776, 512, ">", 16, 12);
            this.btnSelectRight.onClickAction = this.btnSelectRightClick;
            this.btnSelectRight.enabled = true;
            this.btnCancel = this.ui.addButton(64, 656, "Cancel", 48, 12);
            this.btnAccept = this.ui.addButton(1026, 656, "Start", 48, 12);
            this.btnAccept.onClickAction = this.btnAcceptOnClick;
        };
        ShipSelect.prototype.update = function () {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.y++;
                if (tile.y >= 720)
                    tile.y = -256;
            }
            this.ui.update();
        };
        ShipSelect.prototype.btnAcceptOnClick = function (button) {
            var shipId = button.parent.ship.key;
            button.parent.game.state.start('WaitingLobby', true, false);
        };
        ShipSelect.prototype.btnSelectLeftClick = function (button) {
            button.parent.shipIndex--;
            if (button.parent.shipIndex <= 0)
                button.parent.shipIndex = 12;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
        };
        ShipSelect.prototype.btnSelectRightClick = function (button) {
            button.parent.shipIndex++;
            if (button.parent.shipIndex >= 13)
                button.parent.shipIndex = 1;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
        };
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
    var WaitingLobby = (function (_super) {
        __extends(WaitingLobby, _super);
        function WaitingLobby() {
            _super.apply(this, arguments);
            this.backgroundTiles = [];
            this.shipIndex = 1;
        }
        WaitingLobby.prototype.create = function () {
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.ship = this.add.sprite(this.world.centerX, this.world.height + 100, 'playerShip1');
            this.ship.anchor.setTo(0.5, 0.5);
            this.add.tween(this.ship).to({ y: -100 }, 8000, Phaser.Easing.Elastic.InOut, true, 100);
            this.add.tween(this.ship).to({ x: this.world.width - (this.world.width / 10), y: this.world.height - (this.world.height / 8) }, 8000, Phaser.Easing.Elastic.InOut, true, 15000);
            this.add.tween(this.ship).to({ x: -100, y: -100 }, 4000, Phaser.Easing.Elastic.InOut, true, 23000);
        };
        WaitingLobby.prototype.update = function () {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.y++;
                if (tile.y >= 720)
                    tile.y = -256;
            }
            this.ui.update();
        };
        return WaitingLobby;
    })(Phaser.State);
    NyxianSkies.WaitingLobby = WaitingLobby;
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
            this.ship = this.add.sprite(-256, 512, 'playerShip1');
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.rotation = 90 * (Math.PI / 180);
            this.title = this.add.sprite(this.world.centerX, -300, 'title');
            this.title.anchor.setTo(0.5, 0.5);
            this.add.tween(this.title).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            var shipTween = this.add.tween(this.ship).to({ x: this.world.centerX }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            shipTween.onComplete.add(this.allowClick, this);
            this.music = this.add.audio('styx', 1, true);
            //this.music.play();
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.btnOnePlayer = this.ui.addButton(348, 600, "1 Player", 48, 8);
            this.btnOnePlayer.onClickAction = this.btnOnePlayerClick;
            this.btnOnePlayer.enabled = false;
            this.btnTwoPlayer = this.ui.addButton(728, 600, "2 Player", 48, 8);
            this.btnTwoPlayer.onClickAction = this.btnTwoPlayerClick;
            this.btnTwoPlayer.enabled = false;
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
            this.add.tween(this.btnOnePlayer.normalSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.normalSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.hoverSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.hoverSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.clickSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.clickSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.textSprite).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.textSprite).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnOnePlayer.textSpriteShadow).to({ x: -1000 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            this.add.tween(this.btnTwoPlayer.textSpriteShadow).to({ x: 2200 }, 2000, Phaser.Easing.Elastic.Out, true, 0);
            var tween = this.add.tween(this.ship).to({ x: 1536 }, 2000, Phaser.Easing.Elastic.InOut, true, 100);
            tween.onComplete.add(this.startShipSelectScreen, this);
        };
        TitleScreen.prototype.allowClick = function () {
            this.btnOnePlayer.enabled = true;
            this.btnTwoPlayer.enabled = true;
        };
        TitleScreen.prototype.btnOnePlayerClick = function (button) {
            button.parent.fadeOut();
        };
        TitleScreen.prototype.btnTwoPlayerClick = function (button) {
            button.parent.fadeOut();
        };
        TitleScreen.prototype.startShipSelectScreen = function () {
            this.game.state.start('ShipSelect', true, false);
        };
        return TitleScreen;
    })(Phaser.State);
    NyxianSkies.TitleScreen = TitleScreen;
})(NyxianSkies || (NyxianSkies = {}));
window.onload = function () {
    var game = new NyxianSkies.NyxianSkiesGame();
};
//# sourceMappingURL=game.js.map