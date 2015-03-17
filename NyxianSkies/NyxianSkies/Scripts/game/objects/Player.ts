module NyxianSkies {
    export class Player {

        /////////////////////////////
        // Variables
        /////////////////////////////
        x: number = 0;
        y: number = 0;
        shipType: number = 0;
        speed: number = 1280 / 3;
        game: Phaser.Game;
        shield: number = 0;
        hull: number = 100;
        shipKey: string;
        playerId: Guid;

        /////////////////////////////
        // Variables
        /////////////////////////////
        sprite: Phaser.Sprite;
        leftEngineEmitter: Phaser.Particles.Arcade.Emitter;
        rightEngineEmitter: Phaser.Particles.Arcade.Emitter;
        bullets: Array<Phaser.Sprite> = [];

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
        previousMouse: number = -1;
        
        constructor(shipType: number, playerId: Guid) {
            this.shipType = shipType;
            this.playerId = playerId;
        }

        createGraphics(game: Phaser.Game, x: number, y: number) {
            this.game = game;
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
            if (!this.sprite)
                return;
            this.leftEngineEmitter.emitX = this.sprite.x - 25;
            this.leftEngineEmitter.emitY = this.sprite.y + 30;

            this.rightEngineEmitter.emitX = this.sprite.x + 25;
            this.rightEngineEmitter.emitY = this.sprite.y + 30;


            var keyChange = false;
            if (this.upKey.isDown !== this.upKeyIsDown) {
                this.upKeyIsDown = this.upKey.isDown;
                keyChange = true;
            }
            if (this.downKey.isDown !== this.downKeyIsDown) {
                this.downKeyIsDown = this.downKey.isDown;
                keyChange = true;
            }
            if (this.leftKey.isDown !== this.leftKeyIsDown) {
                this.leftKeyIsDown = this.leftKey.isDown;
                keyChange = true;
            }
            if (this.rightKey.isDown !== this.rightKeyIsDown) {
                this.rightKeyIsDown = this.rightKey.isDown;
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
            
            if (this.specialKey.isDown) {
                this.fireSpecial();
            }

            if (this.game.input.activePointer.isDown) {
                if (this.game.input.activePointer.button === Phaser.Mouse.LEFT_BUTTON) {
                    this.fireNormal();
                }
            }
        }

        fireNormal() {
            var bulletSprite = this.game.add.sprite(this.sprite.x, this.sprite.y, 'spritesheet', 'laserGreen04.png');
            this.bullets[this.bullets.length] = bulletSprite;
            var bulletTween = this.game.add.tween(bulletSprite).to({ y: -256 }, 2000, Phaser.Easing.Linear.None, true, 0);
            bulletTween.onComplete.add(this.onBulletOffScreen, [this.bullets, bulletSprite]);
        }

        fireSpecial() {
            
        }

        onBulletOffScreen() {
            var bullets = this[0];
            var bulletSprite = this[1];
            var index = bullets.indexOf(bulletSprite, 0);
            if (index != undefined) {
                bullets.splice(index, 1);
            }
        }

        move(x: number, y: number) {
            this.sprite.x += (x  * this.speed);
            this.sprite.y += (y * this.speed);
        }

        moveTo(x: number, y: number) {
            this.game.add.tween(this.sprite).to({ x: x, y: y }, 100, Phaser.Easing.Linear.None, true, 0);
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
