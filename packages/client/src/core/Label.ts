import { Node } from "./Node";

export class Label {
    public node: Node = new Node();
    public fontSize: number = 20;
    public text: string = '';
    public color: string = '#ffffff';
    maxWidth: number = 0;
    public texts: string[] = [];

    public constructor(text: string, fontSize: number, maxWidth: number = 0) {
        this.text = text;
        this.fontSize = fontSize;
        this.maxWidth = maxWidth;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = this.color;
        
        const txtMetrix = ctx.measureText(this.text);
        const textHeight = txtMetrix.actualBoundingBoxAscent + txtMetrix.actualBoundingBoxDescent;

        if(this.maxWidth > 0) {
            this.calcTexts(ctx);
            let totalHeight = this.texts.length * textHeight;
            let x = this.node.position.x - this.maxWidth * this.node.anchor.x;
            let startY = this.node.position.y + this.texts.length * textHeight * (1 - this.node.anchor.y);
            for(let i = 0, len = this.texts.length; i < len; i++) {
                let y = startY - (len - i) * textHeight;
                ctx.fillText(this.texts[i], x, y);
            }
        }
        else {
            this.node.width = txtMetrix.width;
            this.node.height = textHeight;

            let x = this.node.position.x - this.node.width * this.node.anchor.x;
            let y = this.node.position.y + this.node.height * (1 - this.node.anchor.y);
            ctx.fillText(this.text, x, y);
        }
    }

    calcTexts(ctx: CanvasRenderingContext2D) {
        if(this.texts.length > 0) {
            return;
        }
        let start = 0;
        let i = 1, len = this.text.length;
        for(; i < len; i++) {
            let metrics = ctx.measureText(this.text.substring(start, i));
            if(metrics.width > this.maxWidth) {
                this.texts.push(this.text.substring(start, i - 1));
                start = i - 1;
            }
            else if(metrics.width == this.maxWidth) {
                this.texts.push(this.text.substring(start, i));
                start = i;
            }
        }
        if(start < len) {
            this.texts.push(this.text.substring(start, len));
        }
    }
}