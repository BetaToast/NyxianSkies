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
//# sourceMappingURL=GameObjects.js.map