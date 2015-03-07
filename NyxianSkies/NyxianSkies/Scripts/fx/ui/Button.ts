module BetaToast {
    export class Button {

        private state: BetaToast.ControlState = ControlState.Normal;

        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 0;
        onClickAction = null;

        //normalRect: Phaser.Rectangle;
        //hoverRect: Phaser.Rectangle;
        //clickRect: Phaser.Rectangle;
        normalSprite: Phaser.Sprite;
        hoverSprite: Phaser.Sprite;
        clickSprite: Phaser.Sprite;

        sprite: Phaser.Sprite;
        content: string;
        textSprite: Phaser.Text;
        textSpriteShadow: Phaser.Text;
        parent: Phaser.State;
        enabled: boolean;


        textStyle = {
            font: "22px Arial",
            fill: "#FFFFFF"
        };

        textShadowStyle = {
            font: "22px Arial",
            fill: "#000000"
        };


        constructor() {
            this.enabled = true;
        }

        update() {
            this.normalSprite.visible = false;
            this.hoverSprite.visible = false;
            this.clickSprite.visible = false;

            switch (this.state) {
                case ControlState.Normal:
                    this.normalSprite.visible = true;
                    break;
                case ControlState.Hover:
                    this.hoverSprite.visible = true;
                    break;
                case ControlState.Click:
                    this.clickSprite.visible = true;
                    break;
            }
        }

        onHover(button, pointer) {
            this.state = ControlState.Hover;
        }

        onLeave(button, pointer) {
            this.state = ControlState.Normal;
        }

        onClick(button, pointer) {
            this.state = ControlState.Click;
            if (this.onClickAction != null && this.enabled) this.onClickAction(this);
        }
    }
}  