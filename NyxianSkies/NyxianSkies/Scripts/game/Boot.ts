/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('preloadBar', 'assets/images/loader.png');
        }

        create() {
            NyxianSkiesGame.currentState = this;
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        }
    }
} 