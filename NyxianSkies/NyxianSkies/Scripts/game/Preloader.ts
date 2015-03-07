/// <reference path="../typings/phaser/phaser.d.ts" />
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
            this.load.image('fire03', 'assets/images/fire03.png');
            this.load.image('explosion00', 'assets/images/explosion00.png');
            this.load.image('explosion01', 'assets/images/explosion01.png');
            this.load.image('explosion02', 'assets/images/explosion02.png');
            this.load.image('explosion03', 'assets/images/explosion03.png');
            this.load.image('explosion04', 'assets/images/explosion04.png');
            this.load.image('explosion05', 'assets/images/explosion05.png');
            this.load.image('explosion06', 'assets/images/explosion06.png');
            this.load.image('explosion07', 'assets/images/explosion07.png');
            this.load.image('explosion08', 'assets/images/explosion08.png');

            this.load.image('water001', 'assets/images/water001.png');
            this.load.image('water002', 'assets/images/water002.png');
            this.load.image('water003', 'assets/images/water003.png');
            this.load.image('water004', 'assets/images/water004.png');

            this.load.image('cloud001', 'assets/images/cloud001.png');
            this.load.image('cloud002', 'assets/images/cloud002.png');
            this.load.image('cloud003', 'assets/images/cloud003.png');
            this.load.image('cloud004', 'assets/images/cloud004.png');

            this.load.image('atmosphere001', 'assets/images/atmosphere001.png');

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