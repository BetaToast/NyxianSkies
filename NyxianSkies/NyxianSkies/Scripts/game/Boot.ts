﻿module NyxianSkies {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('preloadBar', 'assets/images/loader.png');
        }

        create() {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        }
    }
} 