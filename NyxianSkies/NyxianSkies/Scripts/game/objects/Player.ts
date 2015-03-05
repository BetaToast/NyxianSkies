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
         // Phaser objects
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
         specialKeyIsDown: boolean;
         
         constructor(game: Phaser.Game, x: number, y: number, shipType: number) {
             this.game = game;
             this.x = x;
             this.y = y;
             this.shipType = shipType;
             
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

             this.registerInput(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR);
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

             if (this.game.input.onHold) {
                 this.fireNormal();
             }

             // Update Up States
             if (this.specialKey.isUp) {
                 this.specialKeyIsDown = false;
             }

             if (this.upKey.isUp) {
                 this.upKeyIsDown = false;
                 this.moveStop();
             }
             if (this.downKey.isUp) {
                 this.downKeyIsDown = false;
                 this.moveStop();
             }

             if (this.leftKey.isUp) {
                 this.leftKeyIsDown = false;
                 this.moveStop();
             }
             if (this.rightKey.isUp) {
                 this.rightKeyIsDown = false;
                 this.moveStop();
             }
             
             // Update Down States
             if (this.specialKey.isDown) {
                 this.fireSpecial();
                 this.specialKeyIsDown = true;
             }

             if (this.upKey.isDown) {
                 this.move(0, -this.speed);
                 this.upKeyIsDown = true;
                 this.moveStart(0, -this.speed);
             }
             else if (this.downKey.isDown) {
                 this.move(0, this.speed);
                 this.downKeyIsDown = true;
                 this.moveStart(0, this.speed);
             }

             if (this.leftKey.isDown) {
                 this.move(-this.speed, 0);
                 this.leftKeyIsDown = true;
                 this.moveStart(-this.speed, 0);
             }
             else if (this.rightKey.isDown) {
                 this.move(+this.speed, 0);
                 this.rightKeyIsDown = true;
                 this.moveStart(this.speed, 0);
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
                 playerId: PlayerId,
                 direction: { X: x, Y: y }
             }));
         }

         moveStop() {
            hub.server.sendAction(JSON.stringify(
            {
                action: 'MoveStop',
                playerId: PlayerId
            }));
         }
     }
 }