import { Node } from "./Node";


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
        ctx.drawImage(this.img, x, y, width, height);
    }
}