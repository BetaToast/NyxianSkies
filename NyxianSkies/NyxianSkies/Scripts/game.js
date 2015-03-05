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
        UserInterface.prototype.addConsole = function (x, y) {
            var ret = new BetaToast.Console();
            ret.parent = this.parent;
            ret.x = x;
            ret.y = y;
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
            NyxianSkies.NyxianSkiesGame.currentState = this;
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
        GameOver.prototype.create = function () {
            NyxianSkies.NyxianSkiesGame.currentState = this;
        };
        return GameOver;
    })(Phaser.State);
    NyxianSkies.GameOver = GameOver;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var Utils = BetaToast.Utils;
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
            this.i = 0;
            this.bgLayer1Tiles = [];
            this.bgLayer2Tiles = [];
            this.gameObjects = [];
        }
        Gameplay.prototype.create = function () {
            NyxianSkies.NyxianSkiesGame.currentState = this;
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.console = this.ui.addConsole(0, 0);
            this.console.addLine("Hello World");
            this.loadMap("Earth");
            var px = this.world.centerX;
            var py = this.world.height - (this.world.centerY / 2);
            this.player1 = new NyxianSkies.Player(this.game, px, py, NyxianSkies.NyxianSkiesGame.shipType);
        };
        Gameplay.prototype.update = function () {
            var bgLayer1Tiles = this.bgLayer1Tiles;
            for (var i = 0; i < bgLayer1Tiles.length; i++) {
                var tile = bgLayer1Tiles[i];
                tile.y += 2;
                //if (tile.y <= -256) tile.y = 976;
                if (tile.y >= 976)
                    tile.y = -256;
            }
            var gameObjects = this.gameObjects;
            for (var i = 0; i < gameObjects.length; i++) {
                var gameObject = gameObjects[i];
                gameObject.y++;
            }
            //var obj = gameObjects[0];
            //this.console.changeLine(0, "Game Object [0]: [" + obj.x + ", " + obj.y + "]");
            this.ui.update();
            this.player1.update();
        };
        Gameplay.prototype.loadMap = function (mapKeyName) {
            this.map = null;
            this.mapFilename = "";
            this.jsonMap = "";
            this.bgLayer1Tiles = [];
            this.bgLayer2Tiles = [];
            this.gameObjects = [];
            this.mapFilename = "assets//maps//" + mapKeyName + ".json";
            this.jsonMap = Utils.readAllText(this.mapFilename);
            this.map = new NyxianSkies.Map(this.jsonMap);
            var map = this.map;
            var bgLayer1Tiles = this.bgLayer1Tiles;
            var bgLayer2Tiles = this.bgLayer2Tiles;
            var gameObjects = this.gameObjects;
            // BG Color
            this.stage.setBackgroundColor(this.map.bgColor);
            // BG Layer 1
            if (map.bgLayer1 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer1Tiles.length;
                        bgLayer1Tiles[index] = this.add.sprite(x, y, map.bgLayer1 + 'Background');
                    }
                }
            }
            // BG Layer 2
            if (map.bgLayer2 !== "None") {
                for (var y = -256; y < 976; y += 256) {
                    for (var x = 0; x < 1280; x += 256) {
                        var index = bgLayer2Tiles.length;
                        bgLayer2Tiles[index] = this.add.sprite(x, y, map.bgLayer2 + 'Background');
                    }
                }
            }
            for (var i = 0; i < map.gameObjects.length; i++) {
                var gameObject = map.gameObjects[i];
                var gameObjectkeyName = NyxianSkies.GameObjects.getTextureAtlasKeyFromId(gameObject.objectType) + ".png";
                var sprite = this.add.sprite(gameObject.x, gameObject.y, 'spritesheet', gameObjectkeyName);
                var index = gameObjects.length;
                if (map.direction === "Vertical") {
                    sprite.y = sprite.y - map.height;
                }
                else if (map.direction === "Horizontal") {
                    sprite.x = sprite.x + map.width;
                }
                gameObjects[index] = sprite;
            }
            var hub = this.game.hub;
            hub.server.sendAction(JSON.stringify({
                action: 'MapLoadedAndReady',
                playerId: this.PlayerId,
                gameId: this.GameId
            }));
        };
        return Gameplay;
    })(Phaser.State);
    NyxianSkies.Gameplay = Gameplay;
})(NyxianSkies || (NyxianSkies = {}));
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />
var canExecute = false;
var pingId;
$(function () {
    hub = $.connection.mainHub;
    hub.client.yourPlayerId = function (playerId) {
        PlayerId = playerId;
        canExecute = true;
    };
    hub.client.pong = function (id) {
        if (pingId == id) {
            var laspe = (new Date()).getTime() - pingId;
            $("#Latency").html(laspe + "ms");
        }
    };
    hub.client.joinedGame = function (gameId) {
        GameId = gameId;
    };
    hub.client.loadLevel = function (level) {
        NyxianSkies.NyxianSkiesGame.currentState.state.start('Gameplay', true, false);
    };
    hub.client.startLevel = function (level) {
        if (level !== undefined) {
            var a = 0;
        }
        hub.server.sendAction(JSON.stringify({
            action: 'StartLevel',
            playerId: PlayerId,
            gameId: GameId
        }));
    };
    hub.client.shipPostionUpdate = function (playerId, position, velocity) {
        //NyxianSkies.NyxianSkiesGame.currentState.state.Gameplay.player1
    };
    //Start the hub and wire up server call functions after it is started
    //$.connection.hub.logging = true; //debugging
    $.connection.hub.start();
});
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var NyxianSkiesGame = (function (_super) {
        __extends(NyxianSkiesGame, _super);
        function NyxianSkiesGame(hub) {
            _super.call(this);
            this.hub = hub;
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
        NyxianSkiesGame.getPlayerShipAtlasKey = function (id) {
            switch (id) {
                case 1:
                    return "playerShip1_red.png";
                case 2:
                    return "playerShip1_blue.png";
                case 3:
                    return "playerShip1_green.png";
                case 4:
                    return "playerShip1_orange.png";
                case 5:
                    return "playerShip2_red.png";
                case 6:
                    return "playerShip2_blue.png";
                case 7:
                    return "playerShip2_green.png";
                case 8:
                    return "playerShip2_orange.png";
                case 9:
                    return "playerShip3_red.png";
                case 10:
                    return "playerShip3_blue.png";
                case 11:
                    return "playerShip3_green.png";
                case 12:
                    return "playerShip3_orange.png";
            }
            return "playerShip1_red.png";
        };
        return NyxianSkiesGame;
    })(BetaToast.Game);
    NyxianSkies.NyxianSkiesGame = NyxianSkiesGame;
})(NyxianSkies || (NyxianSkies = {}));
var NyxianSkies;
(function (NyxianSkies) {
    var GameObject = (function () {
        function GameObject(objectType) {
            this.objectType = objectType;
        }
        GameObject.prototype.clone = function (deGameObject) {
            var ret = new GameObject(this.objectType);
            ret.x = deGameObject.X;
            ret.y = deGameObject.Y;
            return ret;
        };
        return GameObject;
    })();
    NyxianSkies.GameObject = GameObject;
})(NyxianSkies || (NyxianSkies = {}));
var NyxianSkies;
(function (NyxianSkies) {
    var GameObjects = (function () {
        function GameObjects() {
            throw new Error("Stop trying to instantiate me!!");
        }
        GameObjects.findObjectById = function (objectType) {
            switch (objectType) {
                case 0:
                    return this.enemyBlack1;
                case 1:
                    return this.enemyBlack2;
                case 2:
                    return this.enemyBlack3;
                case 3:
                    return this.enemyBlack4;
                case 4:
                    return this.enemyBlack5;
                case 5:
                    return this.enemyBlue1;
                case 6:
                    return this.enemyBlue2;
                case 7:
                    return this.enemyBlue3;
                case 8:
                    return this.enemyBlue4;
                case 9:
                    return this.enemyBlue5;
                case 10:
                    return this.enemyGreen1;
                case 11:
                    return this.enemyGreen2;
                case 12:
                    return this.enemyGreen3;
                case 13:
                    return this.enemyGreen4;
                case 14:
                    return this.enemyGreen5;
                case 15:
                    return this.enemyRed1;
                case 16:
                    return this.enemyRed2;
                case 17:
                    return this.enemyRed3;
                case 18:
                    return this.enemyRed4;
                case 19:
                    return this.enemyRed5;
                case 20:
                    return this.meteorBrown_big1;
                case 21:
                    return this.meteorBrown_big2;
                case 22:
                    return this.meteorBrown_big3;
                case 23:
                    return this.meteorBrown_big4;
                case 24:
                    return this.meteorBrown_med1;
                case 25:
                    return this.meteorBrown_med3;
                case 26:
                    return this.meteorBrown_small1;
                case 27:
                    return this.meteorBrown_small2;
                case 28:
                    return this.meteorBrown_tiny1;
                case 29:
                    return this.meteorBrown_tiny2;
                case 30:
                    return this.meteorGrey_big1;
                case 31:
                    return this.meteorGrey_big2;
                case 32:
                    return this.meteorGrey_big3;
                case 33:
                    return this.meteorGrey_big4;
                case 34:
                    return this.meteorGrey_med1;
                case 35:
                    return this.meteorGrey_med2;
                case 36:
                    return this.meteorGrey_small1;
                case 37:
                    return this.meteorGrey_small2;
                case 38:
                    return this.meteorGrey_tiny1;
                case 39:
                    return this.meteorGrey_tiny2;
                case 40:
                    return this.playerShip1_blue;
                case 41:
                    return this.playerShip1_green;
                case 42:
                    return this.playerShip1_orange;
                case 43:
                    return this.playerShip1_red;
                case 44:
                    return this.playerShip2_blue;
                case 45:
                    return this.playerShip2_green;
                case 46:
                    return this.playerShip2_orange;
                case 47:
                    return this.playerShip2_red;
                case 48:
                    return this.playerShip3_blue;
                case 49:
                    return this.playerShip3_green;
                case 50:
                    return this.playerShip3_orange;
                case 51:
                    return this.playerShip3_red;
                case 52:
                    return this.ufoBlue;
                case 53:
                    return this.ufoGreen;
                case 54:
                    return this.ufoRed;
                case 55:
                    return this.ufoYellow;
            }
            return null;
        };
        GameObjects.getTextureAtlasKeyFromId = function (objectType) {
            switch (objectType) {
                case 0:
                    return "enemyBlack1";
                case 1:
                    return "enemyBlack2";
                case 2:
                    return "enemyBlack3";
                case 3:
                    return "enemyBlack4";
                case 4:
                    return "enemyBlack5";
                case 5:
                    return "enemyBlue1";
                case 6:
                    return "enemyBlue2";
                case 7:
                    return "enemyBlue3";
                case 8:
                    return "enemyBlue4";
                case 9:
                    return "enemyBlue5";
                case 10:
                    return "enemyGreen1";
                case 11:
                    return "enemyGreen2";
                case 12:
                    return "enemyGreen3";
                case 13:
                    return "enemyGreen4";
                case 14:
                    return "enemyGreen5";
                case 15:
                    return "enemyRed1";
                case 16:
                    return "enemyRed2";
                case 17:
                    return "enemyRed3";
                case 18:
                    return "enemyRed4";
                case 19:
                    return "enemyRed5";
                case 20:
                    return "meteorBrown_big1";
                case 21:
                    return "meteorBrown_big2";
                case 22:
                    return "meteorBrown_big3";
                case 23:
                    return "meteorBrown_big4";
                case 24:
                    return "meteorBrown_med1";
                case 25:
                    return "meteorBrown_med3";
                case 26:
                    return "meteorBrown_small1";
                case 27:
                    return "meteorBrown_small2";
                case 28:
                    return "meteorBrown_tiny1";
                case 29:
                    return "meteorBrown_tiny2";
                case 30:
                    return "meteorGrey_big1";
                case 31:
                    return "meteorGrey_big2";
                case 32:
                    return "meteorGrey_big3";
                case 33:
                    return "meteorGrey_big4";
                case 34:
                    return "meteorGrey_med1";
                case 35:
                    return "meteorGrey_med2";
                case 36:
                    return "meteorGrey_small1";
                case 37:
                    return "meteorGrey_small2";
                case 38:
                    return "meteorGrey_tiny1";
                case 39:
                    return "meteorGrey_tiny2";
                case 40:
                    return "playerShip1_blue";
                case 41:
                    return "playerShip1_green";
                case 42:
                    return "playerShip1_orange";
                case 43:
                    return "playerShip1_red";
                case 44:
                    return "playerShip2_blue";
                case 45:
                    return "playerShip2_green";
                case 46:
                    return "playerShip2_orange";
                case 47:
                    return "playerShip2_red";
                case 48:
                    return "playerShip3_blue";
                case 49:
                    return "playerShip3_green";
                case 50:
                    return "playerShip3_orange";
                case 51:
                    return "playerShip3_red";
                case 52:
                    return "ufoBlue";
                case 53:
                    return "ufoGreen";
                case 54:
                    return "ufoRed";
                case 55:
                    return "ufoYellow";
            }
            return "";
        };
        GameObjects.enemyBlack1 = new NyxianSkies.GameObject(0);
        GameObjects.enemyBlack2 = new NyxianSkies.GameObject(1);
        GameObjects.enemyBlack3 = new NyxianSkies.GameObject(2);
        GameObjects.enemyBlack4 = new NyxianSkies.GameObject(3);
        GameObjects.enemyBlack5 = new NyxianSkies.GameObject(4);
        GameObjects.enemyBlue1 = new NyxianSkies.GameObject(5);
        GameObjects.enemyBlue2 = new NyxianSkies.GameObject(6);
        GameObjects.enemyBlue3 = new NyxianSkies.GameObject(7);
        GameObjects.enemyBlue4 = new NyxianSkies.GameObject(8);
        GameObjects.enemyBlue5 = new NyxianSkies.GameObject(9);
        GameObjects.enemyGreen1 = new NyxianSkies.GameObject(10);
        GameObjects.enemyGreen2 = new NyxianSkies.GameObject(11);
        GameObjects.enemyGreen3 = new NyxianSkies.GameObject(12);
        GameObjects.enemyGreen4 = new NyxianSkies.GameObject(13);
        GameObjects.enemyGreen5 = new NyxianSkies.GameObject(14);
        GameObjects.enemyRed1 = new NyxianSkies.GameObject(15);
        GameObjects.enemyRed2 = new NyxianSkies.GameObject(16);
        GameObjects.enemyRed3 = new NyxianSkies.GameObject(17);
        GameObjects.enemyRed4 = new NyxianSkies.GameObject(18);
        GameObjects.enemyRed5 = new NyxianSkies.GameObject(19);
        GameObjects.meteorBrown_big1 = new NyxianSkies.GameObject(20);
        GameObjects.meteorBrown_big2 = new NyxianSkies.GameObject(21);
        GameObjects.meteorBrown_big3 = new NyxianSkies.GameObject(22);
        GameObjects.meteorBrown_big4 = new NyxianSkies.GameObject(23);
        GameObjects.meteorBrown_med1 = new NyxianSkies.GameObject(24);
        GameObjects.meteorBrown_med3 = new NyxianSkies.GameObject(25);
        GameObjects.meteorBrown_small1 = new NyxianSkies.GameObject(26);
        GameObjects.meteorBrown_small2 = new NyxianSkies.GameObject(27);
        GameObjects.meteorBrown_tiny1 = new NyxianSkies.GameObject(28);
        GameObjects.meteorBrown_tiny2 = new NyxianSkies.GameObject(29);
        GameObjects.meteorGrey_big1 = new NyxianSkies.GameObject(30);
        GameObjects.meteorGrey_big2 = new NyxianSkies.GameObject(31);
        GameObjects.meteorGrey_big3 = new NyxianSkies.GameObject(32);
        GameObjects.meteorGrey_big4 = new NyxianSkies.GameObject(33);
        GameObjects.meteorGrey_med1 = new NyxianSkies.GameObject(34);
        GameObjects.meteorGrey_med2 = new NyxianSkies.GameObject(35);
        GameObjects.meteorGrey_small1 = new NyxianSkies.GameObject(36);
        GameObjects.meteorGrey_small2 = new NyxianSkies.GameObject(37);
        GameObjects.meteorGrey_tiny1 = new NyxianSkies.GameObject(38);
        GameObjects.meteorGrey_tiny2 = new NyxianSkies.GameObject(39);
        GameObjects.playerShip1_blue = new NyxianSkies.GameObject(40);
        GameObjects.playerShip1_green = new NyxianSkies.GameObject(41);
        GameObjects.playerShip1_orange = new NyxianSkies.GameObject(42);
        GameObjects.playerShip1_red = new NyxianSkies.GameObject(43);
        GameObjects.playerShip2_blue = new NyxianSkies.GameObject(44);
        GameObjects.playerShip2_green = new NyxianSkies.GameObject(45);
        GameObjects.playerShip2_orange = new NyxianSkies.GameObject(46);
        GameObjects.playerShip2_red = new NyxianSkies.GameObject(47);
        GameObjects.playerShip3_blue = new NyxianSkies.GameObject(48);
        GameObjects.playerShip3_green = new NyxianSkies.GameObject(49);
        GameObjects.playerShip3_orange = new NyxianSkies.GameObject(50);
        GameObjects.playerShip3_red = new NyxianSkies.GameObject(51);
        GameObjects.ufoBlue = new NyxianSkies.GameObject(52);
        GameObjects.ufoGreen = new NyxianSkies.GameObject(53);
        GameObjects.ufoRed = new NyxianSkies.GameObject(54);
        GameObjects.ufoYellow = new NyxianSkies.GameObject(55);
        return GameObjects;
    })();
    NyxianSkies.GameObjects = GameObjects;
})(NyxianSkies || (NyxianSkies = {}));
var NyxianSkies;
(function (NyxianSkies) {
    var Map = (function () {
        function Map(json) {
            if (json === void 0) { json = ""; }
            this.gameObjects = [];
            if (json === "")
                return;
            var deMap = null;
            eval("deMap = " + json + ";");
            this.name = deMap.Name;
            this.direction = deMap.Direction;
            this.width = deMap.Width;
            this.height = deMap.Height;
            this.bgColor = deMap.BGColor;
            this.bgLayer1 = deMap.BGLayer1;
            this.bgLayer2 = deMap.BGLayer2;
            for (var i = 0; i < deMap.GameObjects.length; i++) {
                var deGameObject = deMap.GameObjects[i];
                var gameObject = NyxianSkies.GameObjects.findObjectById(deGameObject.Type).clone(deGameObject);
                this.gameObjects[this.gameObjects.length] = gameObject;
            }
        }
        return Map;
    })();
    NyxianSkies.Map = Map;
})(NyxianSkies || (NyxianSkies = {}));
var NyxianSkies;
(function (NyxianSkies) {
    var Player = (function () {
        function Player(game, x, y, shipType) {
            /////////////////////////////
            // Variables
            /////////////////////////////
            this.x = 0;
            this.y = 0;
            this.shipType = 0;
            this.speed = 8;
            this.shield = 0;
            this.hull = 100;
            this.game = game;
            this.x = x;
            this.y = y;
            this.shipType = shipType;
            this.registerInput(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR);
            this.shipKey = NyxianSkies.NyxianSkiesGame.getPlayerShipAtlasKey(this.shipType);
            this.sprite = this.game.add.sprite(this.x, this.y, 'spritesheet', this.shipKey);
            this.sprite.anchor.setTo(0.5, 0.5);
        }
        Player.prototype.registerInput = function (upKey, downKey, leftKey, rightKey, specialKey) {
            this.upKey = this.game.input.keyboard.addKey(upKey);
            this.downKey = this.game.input.keyboard.addKey(downKey);
            this.leftKey = this.game.input.keyboard.addKey(leftKey);
            this.rightKey = this.game.input.keyboard.addKey(rightKey);
            this.specialKey = this.game.input.keyboard.addKey(specialKey);
        };
        Player.prototype.update = function () {
            if (this.game.input.onHold) {
                this.fireNormal();
            }
            if (this.specialKey.isDown) {
                this.fireSpecial();
            }
            if (this.upKey.isDown) {
                this.move(0, -this.speed);
            }
            else if (this.downKey.isDown) {
                this.move(0, this.speed);
            }
            if (this.leftKey.isDown) {
                this.move(-this.speed, 0);
            }
            else if (this.rightKey.isDown) {
                this.move(+this.speed, 0);
            }
            hub.server.sendAction(JSON.stringify({
                action: 'MoveStart',
                playerId: PlayerId,
                direction: { x: 5, y: 5 }
            }));
            hub.server.sendAction(JSON.stringify({
                action: 'MoveStop',
                playerId: PlayerId,
            }));
        };
        Player.prototype.fireNormal = function () {
        };
        Player.prototype.fireSpecial = function () {
        };
        Player.prototype.move = function (x, y) {
            this.sprite.x += x;
            this.sprite.y += y;
        };
        Player.prototype.takeShieldDamage = function (value) {
            this.shield -= value;
        };
        Player.prototype.takeHullDamage = function (value) {
            this.hull -= value;
        };
        return Player;
    })();
    NyxianSkies.Player = Player;
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
            NyxianSkies.NyxianSkiesGame.currentState = this;
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
            NyxianSkies.NyxianSkiesGame.currentState = this;
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
            button.parent.game.state.start('WaitingLobby', true, false);
            var shipId = button.parent.shipIndex;
            hub.server.sendAction(JSON.stringify({
                action: 'JoinSinglePlayerGame',
                ship: shipId
            }));
        };
        ShipSelect.prototype.btnSelectLeftClick = function (button) {
            button.parent.shipIndex--;
            if (button.parent.shipIndex <= 0)
                button.parent.shipIndex = 12;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
            NyxianSkies.NyxianSkiesGame.shipType = button.parent.shipIndex;
        };
        ShipSelect.prototype.btnSelectRightClick = function (button) {
            button.parent.shipIndex++;
            if (button.parent.shipIndex >= 13)
                button.parent.shipIndex = 1;
            button.parent.ship.key = 'playerShip' + button.parent.shipIndex;
            button.parent.ship.setTexture(PIXI.TextureCache[button.parent.ship.key]);
            NyxianSkies.NyxianSkiesGame.shipType = button.parent.shipIndex;
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
        StageSelect.prototype.create = function () {
            NyxianSkies.NyxianSkiesGame.currentState = this;
        };
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
        TechSelect.prototype.create = function () {
            NyxianSkies.NyxianSkiesGame.currentState = this;
        };
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
            NyxianSkies.NyxianSkiesGame.currentState = this;
            for (var y = 0; y < 720; y += 256) {
                for (var x = 0; x < 1536; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ship = this.add.sprite(-400, 462, 'playerShip1');
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.rotation = 90 * (Math.PI / 180);
            this.title = this.add.sprite(-400, 462, 'title');
            this.title.anchor.setTo(0.5, 0.5);
            this.music = this.add.audio('styx', 1, true);
            //this.music.play();
            this.ui = new BetaToast.UserInterface(this, "blue");
            this.btnOnePlayer = this.ui.addButton(-400, 462, "1 Player", 48, 8);
            this.btnOnePlayer.onClickAction = this.btnOnePlayerClick;
            this.btnOnePlayer.enabled = false;
            this.btnTwoPlayer = this.ui.addButton(-400, 462, "2 Player", 48, 8);
            this.btnTwoPlayer.onClickAction = this.btnTwoPlayerClick;
            this.btnTwoPlayer.enabled = false;
            var start = 250;
            var length = 2000;
            this.add.tween(this.ship).to({ x: this.world.centerX }, length, Phaser.Easing.Elastic.InOut, true, start);
            start += 750;
            length = 3000;
            this.add.tween(this.title).to({ x: this.world.centerX, y: 220 }, length, Phaser.Easing.Elastic.InOut, true, start).onComplete.add(this.allowClick, this);
            ;
            start += 250;
            this.add.tween(this.btnTwoPlayer.normalSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.hoverSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.clickSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.textSprite).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnTwoPlayer.textSpriteShadow).to({ x: 728, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            start += 75;
            this.add.tween(this.btnOnePlayer.normalSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.hoverSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.clickSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.textSprite).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            this.add.tween(this.btnOnePlayer.textSpriteShadow).to({ x: 348, y: 600 }, length, Phaser.Easing.Elastic.InOut, true, start);
            //
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
/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />
var NyxianSkies;
(function (NyxianSkies) {
    var WaitingLobby = (function (_super) {
        __extends(WaitingLobby, _super);
        function WaitingLobby() {
            _super.apply(this, arguments);
            this.backgroundTiles = [];
        }
        WaitingLobby.prototype.create = function () {
            NyxianSkies.NyxianSkiesGame.currentState = this;
            for (var y = -256; y < 976; y += 256) {
                for (var x = 0; x < 1280; x += 256) {
                    var index = this.backgroundTiles.length;
                    this.backgroundTiles[index] = this.add.sprite(x, y, 'blackBackground');
                }
            }
            this.ui = new BetaToast.UserInterface(this, "blue");
        };
        WaitingLobby.prototype.update = function () {
            for (var i = 0; i < this.backgroundTiles.length; i++) {
                var tile = this.backgroundTiles[i];
                tile.y++;
                if (tile.y >= 720)
                    tile.y = -256;
            }
            this.ui.update();
            //if (NyxianSkies.NyxianSkiesGame.map !== null) {
            //    var game = <NyxianSkiesGame> this.game;
            //game.hub.client.startLevel();
            //}
        };
        return WaitingLobby;
    })(Phaser.State);
    NyxianSkies.WaitingLobby = WaitingLobby;
})(NyxianSkies || (NyxianSkies = {}));
var _this = this;
window.onload = function () {
    var game = new NyxianSkies.NyxianSkiesGame(_this.hub);
};
//# sourceMappingURL=game.js.map