import { Node } from "./Node";

export class Label extends Node {
    public fontSize: number = 20;
    public text: string = '';
    public color: string = '#ffffff';
    public maxWidth: number = 0;
    public texts: string[] = [];

    // public constructor(text: string, fontSize: number, maxWidth: number = 0) {
    //     this.text = text;
    //     this.fontSize = fontSize;
    //     this.maxWidth = maxWidth;
    // }

    protected render(ctx: CanvasRenderingContext2D) {
        if(!this.active) {
            return;
        }
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = this.color;
        
        let txtMetrix = ctx.measureText(this.text);
        let textHeight = txtMetrix.actualBoundingBoxAscent + txtMetrix.actualBoundingBoxDescent;
        
        let angle = this.matrix.angle;
        if(this.maxWidth > 0) {
            this.calcTexts(ctx);
            let startY = this.position.y - this.texts.length * textHeight * this.anchor.y;
            for(let i = 0, len = this.texts.length; i < len; i++) {
                let y = startY + i * textHeight;
                ctx.translate(this.position.x, y);
                ctx.scale(this.scaleX, this.scaleY);
                
                ctx.fillText(this.texts[i], - this.maxWidth * this.anchor.x, 0);
                ctx.scale(1 / this.scaleX, 1 / this.scaleY);
                ctx.translate(-this.position.x, -y);
            }
        }
        else {
            this.width = txtMetrix.width;
            this.height = textHeight;

            ctx.translate(this.position.x, this.position.y);
            ctx.scale(this.scaleX, this.scaleY);
            // ctx.rotate(angle);  // TODO: 加了旋转位置不对
            ctx.fillText(this.text, -this.width * this.anchor.x, this.height * (1 - this.anchor.y));
            // ctx.rotate(-angle);
            ctx.scale(1 / this.scaleX, 1 / this.scaleY);
            ctx.translate(-this.position.x, -this.position.y);
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