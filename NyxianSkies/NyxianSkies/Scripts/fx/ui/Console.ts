module BetaToast {
    export class Console {
        x: number = 0;
        y: number = 0;
        lines: Array<string> = [];
        sprites: Array<Phaser.Text> = [];
        parent: Phaser.State;
        enabled: boolean;

        fontSize = 22;
        textStyle = {
            font: "22px Arial",
            fill: "#FFFFFF"
        };

        constructor() {
            this.enabled = true;
        }

        update() {
            for (var i = 0; i < this.lines.length; i++) {
                var sprite = this.sprites[i];
                var line = this.lines[i];
                if (sprite === undefined) {
                    sprite = this.parent.game.add.text(this.x, this.y + (i * this.fontSize), line, this.textStyle);
                    this.sprites[i] = sprite;
                }
            }
        }

        addLine(value: string) {
            this.lines[this.lines.length] = value;
        }

        changeLine(line: number, value: string) {
            this.lines[line] = value;
            if (this.sprites[line] !== undefined)
                this.sprites[line].setText(value);
            else
                this.sprites[line] = this.parent.game.add.text(this.x, this.y + (line * this.fontSize), value, this.textStyle);
        }
    }
} 