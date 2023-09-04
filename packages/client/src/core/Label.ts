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
        
        let txtMetrix = ctx.measureText(this.text);
        let textHeight = txtMetrix.actualBoundingBoxAscent + txtMetrix.actualBoundingBoxDescent;
        
        let angle = this.node.matrix.angle;
        if(this.maxWidth > 0) {
            this.calcTexts(ctx);
            let startY = this.node.position.y - this.texts.length * textHeight * this.node.anchor.y;
            for(let i = 0, len = this.texts.length; i < len; i++) {
                let y = startY + i * textHeight;
                ctx.translate(this.node.position.x, y);
                ctx.scale(this.node.scaleX, this.node.scaleY);
                
                ctx.fillText(this.texts[i], - this.maxWidth * this.node.anchor.x, 0);
                ctx.scale(1 / this.node.scaleX, 1 / this.node.scaleY);
                ctx.translate(-this.node.position.x, -y);
            }
        }
        else {
            this.node.width = txtMetrix.width;
            this.node.height = textHeight;

            ctx.translate(this.node.position.x, this.node.position.y);
            ctx.scale(this.node.scaleX, this.node.scaleY);
            // ctx.rotate(angle);  // TODO: 加了旋转位置不对
            ctx.fillText(this.text, -this.node.width * this.node.anchor.x, this.node.height * (1 - this.node.anchor.y));
            // ctx.rotate(-angle);
            ctx.scale(1 / this.node.scaleX, 1 / this.node.scaleY);
            ctx.translate(-this.node.position.x, -this.node.position.y);
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