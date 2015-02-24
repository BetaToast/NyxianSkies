module BetaToast {
    export class Button {

        private state: BetaToast.ControlState = ControlState.Normal;

        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 0;
        onClickAction = null;

        normalRect: Phaser.Rectangle;
        hoverRect: Phaser.Rectangle;
        clickRect: Phaser.Rectangle;
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
            //switch (this.state) {
            //    case ControlState.Normal:
            //        this.sprite.cropRect = this.normalRect;
            //        break;
            //    case ControlState.Hover:
            //        this.sprite.cropRect = this.hoverRect;
            //        break;
            //    case ControlState.Click:
            //        this.sprite.cropRect = this.clickRect;
            //        break;
            //}
            //this.sprite.updateCrop();
        }

        onHover(button, pointer) {
            //this.state = ControlState.Hover;
        }

        onLeave(button, pointer) {
            //this.state = ControlState.Normal;
        }

        onClick(button, pointer) {
            //this.state = ControlState.Click;
            if (this.onClickAction != null && this.enabled) this.onClickAction(this);
        }
    }
}  