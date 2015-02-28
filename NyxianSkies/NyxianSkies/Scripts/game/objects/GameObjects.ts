module NyxianSkies {
    export class GameObjects {
        constructor() {
            throw new Error("Stop trying to instantiate me!!");
        }       

        static enemyBlack1:        GameObject = new GameObject(0);
        static enemyBlack2:        GameObject = new GameObject(1);
        static enemyBlack3:        GameObject = new GameObject(2);
        static enemyBlack4:        GameObject = new GameObject(3);
        static enemyBlack5:        GameObject = new GameObject(4);
        static enemyBlue1:         GameObject = new GameObject(5);
        static enemyBlue2:         GameObject = new GameObject(6);
        static enemyBlue3:         GameObject = new GameObject(7);
        static enemyBlue4:         GameObject = new GameObject(8);
        static enemyBlue5:         GameObject = new GameObject(9);
        static enemyGreen1:        GameObject = new GameObject(10);
        static enemyGreen2:        GameObject = new GameObject(11);
        static enemyGreen3:        GameObject = new GameObject(12);
        static enemyGreen4:        GameObject = new GameObject(13);
        static enemyGreen5:        GameObject = new GameObject(14);
        static enemyRed1:          GameObject = new GameObject(15);
        static enemyRed2:          GameObject = new GameObject(16);
        static enemyRed3:          GameObject = new GameObject(17);
        static enemyRed4:          GameObject = new GameObject(18);
        static enemyRed5:          GameObject = new GameObject(19);
        static meteorBrown_big1:   GameObject = new GameObject(20);
        static meteorBrown_big2:   GameObject = new GameObject(21);
        static meteorBrown_big3:   GameObject = new GameObject(22);
        static meteorBrown_big4:   GameObject = new GameObject(23);
        static meteorBrown_med1:   GameObject = new GameObject(24);
        static meteorBrown_med3:   GameObject = new GameObject(25);
        static meteorBrown_small1: GameObject = new GameObject(26);
        static meteorBrown_small2: GameObject = new GameObject(27);
        static meteorBrown_tiny1:  GameObject = new GameObject(28);
        static meteorBrown_tiny2:  GameObject = new GameObject(29);
        static meteorGrey_big1:    GameObject = new GameObject(30);
        static meteorGrey_big2:    GameObject = new GameObject(31);
        static meteorGrey_big3:    GameObject = new GameObject(32);
        static meteorGrey_big4:    GameObject = new GameObject(33);
        static meteorGrey_med1:    GameObject = new GameObject(34);
        static meteorGrey_med2:    GameObject = new GameObject(35);
        static meteorGrey_small1:  GameObject = new GameObject(36);
        static meteorGrey_small2:  GameObject = new GameObject(37);
        static meteorGrey_tiny1:   GameObject = new GameObject(38);
        static meteorGrey_tiny2:   GameObject = new GameObject(39);
        static playerShip1_blue:   GameObject = new GameObject(40);
        static playerShip1_green:  GameObject = new GameObject(41);
        static playerShip1_orange: GameObject = new GameObject(42);
        static playerShip1_red:    GameObject = new GameObject(43);
        static playerShip2_blue:   GameObject = new GameObject(44);
        static playerShip2_green:  GameObject = new GameObject(45);
        static playerShip2_orange: GameObject = new GameObject(46);
        static playerShip2_red:    GameObject = new GameObject(47);
        static playerShip3_blue:   GameObject = new GameObject(48);
        static playerShip3_green:  GameObject = new GameObject(49);
        static playerShip3_orange: GameObject = new GameObject(50);
        static playerShip3_red:    GameObject = new GameObject(51);
        static ufoBlue:            GameObject = new GameObject(52);
        static ufoGreen:           GameObject = new GameObject(53);
        static ufoRed:             GameObject = new GameObject(54);
        static ufoYellow:          GameObject = new GameObject(55);

        static findObjectById(objectType: number) {
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
        }

        static getTextureAtlasKeyFromId(objectType: number) {
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
        }
    }
}    