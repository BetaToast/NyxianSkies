/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    import Utils = BetaToast.Utils;

    export class NyxianSkiesGame extends BetaToast.Game {

        static currentState;
        static shipType;
        static player1: NyxianSkies.Player;
        static player2: NyxianSkies.Player;
        static mapSpeed: number = 8;
        static currentMapName: string = "Earth";

        hub;

        constructor(hub) {
            super();

            this.hub = hub;
            
            // Add all of our screens here
            this.state.add('Boot', Boot, false);
            this.state.add('GameOver', GameOver, false);
            this.state.add('Gameplay', Gameplay, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('ShipSelect', ShipSelect, false);
            this.state.add('StageSelect', StageSelect, false);
            this.state.add('TechSelect', TechSelect, false);
            this.state.add('TitleScreen', TitleScreen, false);
            this.state.add('WaitingLobby', WaitingLobby, false);
            
            // Start Boot screen
            this.state.start('Boot');
        }

        static getPlayerShipAtlasKey(id: number) {
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
        }
    }
}