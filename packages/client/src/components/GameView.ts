import { Label } from "../core/Label";
import { Sprite } from "../core/Sprite";
import { Node } from "../core/Node";
import { Vec2 } from "../core/vec";
import { Global, View } from "../Global";

export class GameView extends Node {
    btnReturn: Node = null!;

    returnBtnCallback: Function | null = null;

    resultNode: Node = new Node('resultNode');

    drill: Node = null!;

    resultBtnOk: Node = null!;
    createSprite(imgName: string, x: number, y: number, ax: number, ay: number, parent: Node) {
        let sp = new Sprite();
        sp.url = `../assets/game/${imgName}.png`;
        sp.setAnchor(ax, ay);
        sp.setLocalPosition(x, y);
        parent.addChild(sp);
        return sp;
    }

    createSpriteMain(imgName: string, x: number, y: number, ax: number, ay: number, parent: Node) {
        let sp = new Sprite(`../assets/main/${imgName}.png`);
        sp.setAnchor(ax, ay);
        sp.setLocalPosition(x, y);
        parent.addChild(sp);
        return sp;
    }

    createSpriteResult(imgName: string, x: number, y: number, ax: number, ay: number, parent: Node) {
        let sp = new Sprite();
        sp.url = `../assets/result/${imgName}.png`;
        sp.setAnchor(ax, ay);
        sp.setLocalPosition(x, y);
        parent.addChild(sp);
        return sp;
    }

    createLabel(txt: string, fontSize: number, x: number, y: number, ax: number, ay: number, color: string, parent: Node) {
        let lbl = new Label();
        lbl.text = txt;
        lbl.fontSize = fontSize;
        lbl.setAnchor(ax, ay);
        lbl.setLocalPosition(x, y);
        lbl.color = color;
        parent.addChild(lbl);
        return lbl;
    }

    createItem(x: number, y: number, parent: Node) {
        let sp = this.createSprite('stone_board', x, y, 0.5, 0, parent);
        let lbl = this.createLabel('Name', 19, 0, 120, 0.5, 0, '#A2FFF1', parent);
        let lbl_x3 = this.createLabel('x3', 19, 0, 140, 0.5, 0, '#E5FFFB', parent);
        sp.addChild(lbl);
        sp.addChild(lbl_x3);
    }

    createItemLine(x: number, y: number, parent: Node) {
        let node = new Node();
        parent.addChild(node);
        node.setLocalPosition(x, y);
        this.createSprite('stone_board', 40, 0, 0, 0, node).scale = 0.8;
        this.createLabel('2023-02-11', 20, 180, 30, 0, 0, '#A2FFF1', node);
        this.createLabel('17:37:33', 20, 190, 60, 0, 0, '#A2FFF1', node);
        this.createSprite('coin2', 360, 70, 0, 1, node);
        this.createLabel('0.01', 20, 400, 50, 0, 0, '#A2FFF1', node);
        this.createLabel('1', 20, 560, 50, 0, 0, '#A2FFF1', node);
        this.createSprite('coin2', 670, 70, 0, 1, node);
        this.createLabel('0.01', 20, 710, 50, 0, 0, '#A2FFF1', node);
        this.createLabel('0.01', 20, 810, 50, 0, 0, '#F80000', node);
        let line = this.createSprite('line', 40, 100, 0, 0, node);
        line.setScale(0.9, 1);
    }

    init() {
        this.createSprite('background', 0, 0, 0, 0, this);
        this.createSprite('position', 0, 0, 0, 0, this);
        this.btnReturn = this.createSprite('btn_return', 50, 20, 0, 0, this);
        let f = this.createSpriteMain('circle_corner_frame', 250, 20, 0, 0, this);
        this.createLabel('WASP-21-C', 20, 35, 20, 0, 0.5, '#ffffff', f);

        let coin2 = this.createSpriteMain('circle_corner_frame', 1940, 40, 0.5, 0.5, this);
        this.createSpriteMain('Star_Coin', 1890, 28, 0.5, 0, this);
        let coin_star_count = new Label();
        coin_star_count.text = '1234567';
        coin_star_count.fontSize = 22;
        coin_star_count.setLocalPosition(10, 0);
        coin2.addChild(coin_star_count);


        let line = this.createSprite('line', 1050, 250, 0, 0, this);
        this.createSprite('Overview', 20, -70, 0, 0, line);
        this.createLabel('00:00:00', 36, 780, -50, 0, 0, '#A2FFF1', line);
        this.createSprite('Quantity', 20, 40, 0, 1, line).scale = 1.4;
        this.createLabel('24', 25, 190, 19, 0, 0, '#E5FFFB', line);
        this.createSprite('lncome', 320, 40, 0, 1, line);
        this.createSprite('coin2', 480, 44, 0, 1, line);
        this.createLabel('4.13', 25, 520, 19, 0, 0, '#E5FFFB', line);
        this.createSprite('Durable', 680, 40, 0, 1, line).scale = 1.4;
        this.createLabel('88%', 25, 870, 19, 0, 0, '#A2FFF1', line);
        let line1 = this.createSprite('line', 1050, 310, 0, 0, this);

        let step = 800 / 7;
        for(let i = 0; i < 8; i++) {
            this.createItem(70 + i * step, 0, line1);
        }

        let frame = this.createSprite('right_frame', 1060, 650, 0, 0, this);
        let line2 = this.createSprite('line', 0, -10, 0, 0, frame);
        this.createSprite('Time', 200, 40, 0, 0, frame);
        this.createSprite('Value', 370, 40, 0, 0, frame);
        this.createSprite('Quantity', 530, 40, 0, 0, frame);
        this.createSprite('TotalValue', 670, 40, 0, 0, frame);
        this.createSprite('Durable', 800, 40, 0, 0, frame);
        this.createSprite('CollectionRecord', 20, -20, 0, 1, line2);

        this.createItemLine(0, 60, frame);
        this.createItemLine(0, 160, frame);
        this.createItemLine(0, 260, frame);
        this.createItemLine(0, 360, frame);

        this.drill = this.createSprite('drill', 300, 540, 0, 1, this);

        this.createLabel('Mining in progress', 30, 300, 570, 0, 0, '#ffffff', this);
        this.createLabel('0 0 : 0 0 : 0 0', 30, 330, 610, 0, 0, '#ffffff', this);
        let line3 = this.createSprite('line', 300, 640, 0, 0, this);
        line3.setScale(0.25, 1);
        this.createLabel('Discovery of Pit No.1 for exploration...', 30, 300, 660, 0, 0, '#ffffff', this);
        this.createLabel('......', 30, 300, 720, 0, 0, '#ffffff', this);
        this.createLabel('No ore body found.', 30, 300, 760, 0, 0, '#ffffff', this);
        this.createLabel('Continue to explore...', 30, 300, 830, 0, 0, '#ffffff', this);


        this.addChild(this.resultNode);
        let result_board = this.createSpriteResult('result_board', 0, 352, 0, 0, this.resultNode);
        this.resultBtnOk = this.createSpriteResult('btn_bg', 0, 496, 0, 1, result_board);
        this.createSpriteResult('OK', 1024, -35, 0.5, 0.5, this.resultBtnOk);
        this.createSpriteResult('SETTLEMENT', 1050, 100, 0, 1, result_board);
        for(let i = 0; i < 8; i++) {
            this.createItem(1090 + i * step, 150, result_board);
        }
        this.createLabel('Your call fee', 30, 1048, 124, 0, 0, '#ffffff', result_board);
        this.createLabel('20H30MIN', 30, 1220, 124, 0, 0, '#f4bb54', result_board);
        this.createLabel('get resources', 30, 1370, 117, 0, 0, '#ffffff', result_board);

        this.createSpriteResult('resources', 1050, 320, 0, 0, result_board);
        this.createSpriteResult('value', 1050, 350, 0, 0, result_board);
        this.createSpriteResult('consumption', 1050, 390, 0, 0, result_board);
        this.createSpriteResult('ticketrewards', 1450, 320, 0, 0, result_board);
        this.createSpriteResult('luckyshare', 1450, 350, 0, 0, result_board);
        let line4 = this.createSpriteResult('vline', 1410, 300, 0, 0, result_board);
        line4.setScale(1, 0.8);

        this.createLabel('24', 20, 1350, 324, 0, 0, '#ffffff', result_board);
        this.createLabel('4.13', 20, 1350, 360, 0, 0, '#ffffff', result_board);
        this.createLabel('4.13', 20, 1750, 360, 0, 0, '#ffffff', result_board);
        this.createLabel('4.13', 20, 1750, 324, 0, 0, '#ffffff', result_board);

        this.createSprite('coin2', 1315, 350, 0, 0, result_board);
        this.createSprite('coin2', 1715, 350, 0, 0, result_board);
        this.createSprite('coin2', 1715, 314, 0, 0, result_board);

        this.resultNode.active = false;
    }

    public onMouseDown(x: number, y: number) {
        if(this.btnReturn.rect.intersect(x, y)) {
            if(this.returnBtnCallback != null) {
                this.returnBtnCallback();
            }
        }
        else if(this.resultNode.active && this.resultBtnOk.rect.intersect(x, y)) {
            this.resultNode.active = false;
        }
        else if(this.drill.rect.intersect(x, y)) {
            this.resultNode.active = true;
        }
    }

    public  onMouseUp(x: number, y: number) { 

    }

    public  onMouseMove(x: number, y: number) {

    }
}