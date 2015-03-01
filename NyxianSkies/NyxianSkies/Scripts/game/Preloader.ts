﻿/// <reference path="../typings/phaser/phaser.d.ts" />
/// <reference path="../typings/phaser/pixi.d.ts" />

module NyxianSkies {
    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite;

        preload() {
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
        }

        create() {
            NyxianSkiesGame.currentState = this;
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startTitleScreen, this);
        }

        startTitleScreen() {
            this.game.state.start('TitleScreen', true, false);
        }
    }
}  