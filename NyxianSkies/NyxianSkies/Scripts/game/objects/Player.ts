module NyxianSkies {
    export class Player {

        /////////////////////////////
        // Variables
        /////////////////////////////
        x: number = 0;
        y: number = 0;
        shipType: number = 0;
        speed: number = 8;
        game: Phaser.Game;
        shield: number = 0;
        hull: number = 100;
        shipKey: string;

        /////////////////////////////
        // Variables
        /////////////////////////////
        sprite: Phaser.Sprite;
        leftEngineEmitter: Phaser.Particles.Arcade.Emitter;
        rightEngineEmitter: Phaser.Particles.Arcade.Emitter;

        /////////////////////////////
        // Input
        /////////////////////////////
        upKey: Phaser.Key;
        downKey: Phaser.Key;
        leftKey: Phaser.Key;
        rightKey: Phaser.Key;
        specialKey: Phaser.Key;
        upKeyIsDown: boolean;
        downKeyIsDown: boolean;
        leftKeyIsDown: boolean;
        rightKeyIsDown: boolean;


        constructor(game: Phaser.Game, x: number, y: number, shipType: number) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.shipType = shipType;

            this.registerInput(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR);

            this.leftEngineEmitter = this.game.add.emitter(this.x - 25, this.y + 23, 400);
            this.leftEngineEmitter.makeParticles(['explosion00', 'explosion01', 'explosion02', 'explosion03', 'explosion04', 'explosion05', 'explosion06', 'explosion07', 'explosion08']);
            this.leftEngineEmitter.gravity = 9999;
            this.leftEngineEmitter.setAlpha(1, 0, 3000);
            this.leftEngineEmitter.setScale(0.8, 0, 0.8, 0, 3000);
            this.leftEngineEmitter.start(false, 100, 5);

            this.rightEngineEmitter = this.game.add.emitter(this.x + 25, this.y + 23, 400);
            this.rightEngineEmitter.makeParticles(['explosion00', 'explosion01', 'explosion02', 'explosion03', 'explosion04', 'explosion05', 'explosion06', 'explosion07', 'explosion08']);
            this.rightEngineEmitter.gravity = 9999;
            this.rightEngineEmitter.setAlpha(1, 0, 3000);
            this.rightEngineEmitter.setScale(0.8, 0, 0.8, 0, 3000);
            this.rightEngineEmitter.start(false, 100, 5);

            this.shipKey = NyxianSkiesGame.getPlayerShipAtlasKey(this.shipType);
            this.sprite = this.game.add.sprite(this.x, this.y, 'spritesheet', this.shipKey);
            this.sprite.anchor.setTo(0.5, 0.5);
        }

        registerInput(upKey: number, downKey: number, leftKey: number, rightKey: number, specialKey: number) {
            this.upKey = this.game.input.keyboard.addKey(upKey);
            this.downKey = this.game.input.keyboard.addKey(downKey);
            this.leftKey = this.game.input.keyboard.addKey(leftKey);
            this.rightKey = this.game.input.keyboard.addKey(rightKey);
            this.specialKey = this.game.input.keyboard.addKey(specialKey);
        }

        update() {
            this.leftEngineEmitter.emitX = this.sprite.x - 25;
            this.leftEngineEmitter.emitY = this.sprite.y + 30;

            this.rightEngineEmitter.emitX = this.sprite.x + 25;
            this.rightEngineEmitter.emitY = this.sprite.y + 30;


            var keyChange = false;
            if (this.upKey.isUp !== this.upKeyIsDown) {
                this.upKeyIsDown = this.upKey.isUp;
                keyChange = true;
            }
            if (this.downKey.isUp !== this.downKeyIsDown) {
                this.downKeyIsDown = this.downKey.isUp;
                keyChange = true;
            }
            if (this.leftKey.isUp !== this.leftKeyIsDown) {
                this.leftKeyIsDown = this.leftKey.isUp;
                keyChange = true;
            }
            if (this.rightKey.isUp !== this.rightKeyIsDown) {
                this.rightKeyIsDown = this.rightKey.isUp;
                keyChange = true;
            }

            if (keyChange === true) {
                if (this.leftKeyIsDown && this.rightKeyIsDown && this.upKeyIsDown && this.downKeyIsDown) {
                    this.moveStop();
                } else {
                    var x = 0;
                    var y = 0;
                    x += this.leftKeyIsDown ? -1 : 0;
                    x += this.rightKeyIsDown ? 1 : 0;
                    y += this.upKeyIsDown ? -1 : 0;
                    y += this.downKeyIsDown ? 1 : 0;
                    this.moveStart(x, y);
                }
            }

            if (this.game.input.onHold) {
                this.fireNormal();
            }
            if (this.specialKey.isDown) {
                this.fireSpecial();
            }

        }

        fireNormal() {

        }

        fireSpecial() {

        }

        move(x: number, y: number) {
            this.sprite.x += x;
            this.sprite.y += y;
        }

        takeShieldDamage(value: number) {
            this.shield -= value;
        }

        takeHullDamage(value: number) {
            this.hull -= value;
        }

        moveStart(x: number, y: number) {
            hub.server.sendAction(JSON.stringify(
            {
                action: 'MoveStart',
                gameId: GameId,
                direction: x + ", " + y,
            }));
        }

        moveStop() {
            hub.server.sendAction(JSON.stringify(
            {
                action: 'MoveStop',
                gameId: GameId,
            }));
        }
    }
}
