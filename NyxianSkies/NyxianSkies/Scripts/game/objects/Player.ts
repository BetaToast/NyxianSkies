 module NyxianSkies {
     export class Player {

         /////////////////////////////
         // Variables
         /////////////////////////////
         x: number = 0;
         y: number = 0;
         shipType: number = 0;
         sprite: Phaser.Sprite;
         speed: number = 8;
         game: Phaser.Game;
         shield: number = 0;
         hull: number = 100;
         shipKey: string;

         /////////////////////////////
         // Input
         /////////////////////////////
         upKey: Phaser.Key;
         downKey: Phaser.Key;
         leftKey: Phaser.Key;
         rightKey: Phaser.Key;
         specialKey: Phaser.Key;
         
         constructor(game: Phaser.Game, x: number, y: number, shipType: number) {
             this.game = game;
             this.x = x;
             this.y = y;
             this.shipType = shipType;

             this.registerInput(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR);

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
             if (this.game.input.onHold) {
                 this.fireNormal();
             }

             if (this.specialKey.isDown) {
                 this.fireSpecial();
             }

             if (this.upKey.isDown) {
                 this.move(0, -this.speed);
             }
             else if (this.downKey.isDown) {
                 this.move(0, this.speed);
             }

             if (this.leftKey.isDown) {
                 this.move(-this.speed, 0);
             }
             else if (this.rightKey.isDown) {
                 this.move(+this.speed, 0);
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
     }
 }