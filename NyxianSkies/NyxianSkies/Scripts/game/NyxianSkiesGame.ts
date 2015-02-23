/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class NyxianSkiesGame extends BetaToast.Game {
        constructor() {
            super();

            // Add all of our screens here
            this.state.add('Boot', Boot, false);
            this.state.add('GameOver', GameOver, false);
            this.state.add('Gameplay', Gameplay, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('ShipSelect', ShipSelect, false);
            this.state.add('StageSelect', StageSelect, false);
            this.state.add('TechSelect', TechSelect, false);
            this.state.add('TitleScreen', TitleScreen, false);

            // Start Boot screen
            this.state.start('Boot');
        }
    }
}