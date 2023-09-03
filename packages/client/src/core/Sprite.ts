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
        
        let width = this.img.width * this.node.scale.x;
        let height = this.img.height * this.node.scale.y;
        let x = this.node.position.x - width * this.node.anchor.x;
        let y = this.node.position.y - height * this.node.anchor.y;
        this.node.rect.position.x = x;
        this.node.rect.position.y = y;
        
        ctx.translate(this.node.position.x, this.node.position.y);
        ctx.rotate(this.node.degree * Matrix3.D2R);
        ctx.drawImage(this.img, -width * this.node.anchor.x, -height * this.node.anchor.y, width, height);
        ctx.rotate(-this.node.degree * Matrix3.D2R);
        ctx.translate(-this.node.position.x, -this.node.position.y);
    }
}