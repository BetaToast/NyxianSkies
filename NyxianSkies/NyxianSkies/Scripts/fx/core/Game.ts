module BetaToast {
    export class Game extends Phaser.Game {
        ui: UserInterface;

        constructor(uiColor = "blue") {
            super(800, 600, Phaser.AUTO, 'content', null);

            this.ui = new UserInterface(uiColor);
        }
    }
}  