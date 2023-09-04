import { Matrix3 } from "./Matrix2d";
import { Node } from "./Node";
import { Rect } from "./rect";


export class Sprite {
    public node: Node = new Node();
    img: HTMLImageElement | null = null;
    isLoadingImg: boolean = true;
    

    public constructor(url: string) {
        this.img = new Image();
        this.img.src = url;
        this.img.onload = () => {
            this.isLoadingImg = false;
            this.node.width = this.img!.width;
            this.node.height = this.img!.height;
            this.node.rect.width = this.img!.width;
            this.node.rect.height = this.img!.height;
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if(this.img == null || this.isLoadingImg){
            return;
        }
        
        let width = this.img.width * this.node.scaleX
        let height = this.img.height * this.node.scaleY;
        let x = this.node.position.x - width * this.node.anchor.x;
        let y = this.node.position.y - height * this.node.anchor.y;
        this.node.rect.position.x = x;
        this.node.rect.position.y = y;
        
        let angle = this.node.matrix.angle;
        ctx.translate(this.node.position.x, this.node.position.y);
        ctx.rotate(angle);
        ctx.drawImage(this.img, -width * this.node.anchor.x, -height * this.node.anchor.y, width, height);
        ctx.rotate(-angle);
        ctx.translate(-this.node.position.x, -this.node.position.y);
    }
}