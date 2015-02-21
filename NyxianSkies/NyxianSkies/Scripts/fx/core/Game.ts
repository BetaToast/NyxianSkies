module BetaToast {
    export class Game extends Phaser.Game {
        ui: UserInterface;

        constructor(uiColor = "blue") {
            super(1280, 720, Phaser.AUTO, 'content', null);

            this.ui = new UserInterface(uiColor);
        }
    }
}  