import { Node } from "./Node";

export class Label {
    public node: Node = new Node();
    public fontSize: number = 20;
    public text: string = '';
    public color: string = '#ffffff';

    public constructor(text: string, fontSize: number) {
        this.text = text;
        this.fontSize = fontSize;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = this.color;
        const txtMetrix = ctx.measureText(this.text);
        const textHeight = txtMetrix.actualBoundingBoxAscent + txtMetrix.actualBoundingBoxDescent;
        // const textHeight = txtMetrix.fontBoundingBoxAscent + txtMetrix.fontBoundingBoxDescent;
        // console.log(textHeight, textHeight1);
        
        this.node.width = txtMetrix.width;
        this.node.height = textHeight;

        let x = this.node.position.x - this.node.width * this.node.scale.x * this.node.anchor.x;
        let y = this.node.position.y + this.node.height * this.node.scale.y * this.node.anchor.y;

        ctx.fillText(this.text, x, y);
    }
}