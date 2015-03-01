/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    import Utils = BetaToast.Utils;
    
    export class Gameplay extends Phaser.State {
        create() {
            NyxianSkiesGame.currentState = this;
        }

        update() {
            
        }
    }
}  