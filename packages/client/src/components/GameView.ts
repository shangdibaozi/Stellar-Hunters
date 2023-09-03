import { Label } from "../core/Label";
import { Sprite } from "../core/Sprite";
import { Node } from "../core/Node";
import { Vec2 } from "../core/vec";

export class GameView {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    rootNode: Node = new Node();
    renderObjs: (Sprite|Label)[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.init();
    }

    init() {
        let centerPos = new Vec2(this.canvas.width / 2, this.canvas.height / 2);

        let background = new Sprite('../assets/game/background.png');
        background.node.setLocalPosition(centerPos.x, centerPos.y);
        this.renderObjs.push(background);
        this.rootNode.addChild(background.node);

        let board = new Sprite('../assets/main/head_background.png');
        board.node.setAnchor(0.5, 0.5);
        board.node.setLocalPosition(77/2, 77/2);
        board.node.degree = 45;
        this.renderObjs.push(board);
        this.rootNode.addChild(board.node);
    }

    public run() {
        this.rootNode.update();

        for(let i = 0; i < this.renderObjs.length; i++) {
            this.renderObjs[i].draw(this.ctx);
        }
    }
}