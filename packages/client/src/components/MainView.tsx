import { useEffect } from "react";
import { Planet } from "./Planet";
import { PlanetCanvas } from "./PlanetCanvas";
import { Sprite } from "../core/Sprite";
import { Node } from "../core/Node";
import { Label } from "../core/Label";

interface IProp {
    canvas: HTMLCanvasElement;
}


export class MainView {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    planetRootNode: Node = new Node();
    plantes: (Sprite|Label)[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.init();
    }

    init() {
        // let background = new Sprite('../assets/main/background.png');
        
        // let head_bg = new Sprite('../assets/main/head_background.png');
        // head_bg.node.setPosition(0, 0);
        
        // let head_frame = new Sprite('../assets/main/head_frame.png');
        // head_frame.node.setPosition(0, 0);

        // let name_bg = new Sprite('../assets/main/name_background.png');
        // name_bg.node.setAnchor(0, 0.5);
        // name_bg.node.setLocalPosition(50, -20);

        // let playerName = new Label('Player Name', 22);
        // playerName.node.setAnchor(0.5, 0.5);
        // playerName.node.setLocalPosition(86.5, 0);
        // name_bg.node.addChild(playerName.node);

        // let coin = new Sprite('../assets/game/coin1.png');
        // coin.node.setAnchor(0, 0.5);
        // coin.node.setLocalPosition(50, 20);

        // let coinLbl = new Label('12345', 22);
        // coinLbl.node.setAnchor(0, 0.5);
        // coinLbl.node.setLocalPosition(30, 0);
        // coin.node.addChild(coinLbl.node);

        // let headNode = new Node('headNode');
        // headNode.setPosition(50, 50);
        // headNode.addChild(head_bg.node);
        // headNode.addChild(head_frame.node);
        // headNode.addChild(name_bg.node);
        // headNode.addChild(coin.node);


        // let planet0 = new Sprite('../assets/main/planet.png');
        // planet0.node.setPosition(200, 300);
        // planet0.node.setScale(0.75, 0.75);
        // planetRootNode.addChild(planet0.node);
        // plantes.push(planet0);

        // let planet1 = new Sprite('../assets/main/planet.png');
        // planet1.node.setPosition(340, 450);
        // planet1.node.setScale(0.9, 0.9);
        // planetRootNode.addChild(planet1.node);
        // plantes.push(planet1);

        // let planet2 = new Sprite('../assets/main/planet.png');
        // planet2.node.setPosition(500, 300);
        // planet2.node.setScale(0.75, 0.75);
        // planetRootNode.addChild(planet2.node);
        // plantes.push(planet2);

        let planet3 = new Sprite('../assets/main/head_background.png');
        // planet3.node.setLocalPosition(1000, 270);
        planet3.node.setAnchor(0, 0)
        planet3.node.setLocalPosition(0, 0);
        planet3.node.setScale(1, 1);
        this.planetRootNode.addChild(planet3.node);
        this.plantes.push(planet3);
        let planet3Name = new Label('Planet', 22);
        planet3Name.node.setAnchor(0, 0);
        planet3Name.node.setLocalPosition(0, 30);
        planet3.node.addChild(planet3Name.node);
        this.plantes.push(planet3Name);

        // let planet4 = new Sprite('../assets/main/planet.png');
        // planet4.node.setPosition(1200, 200);
        // planet4.node.setScale(0.5, 0.5);
        // planetRootNode.addChild(planet4.node);
        // plantes.push(planet4);

        // let planet5 = new Sprite('../assets/main/planet.png');
        // planet5.node.setPosition(1020, 500);
        // planet5.node.setScale(0.5, 0.5);
        // planetRootNode.addChild(planet5.node);
        // plantes.push(planet5);

        // let planet6 = new Sprite('../assets/main/planet.png');
        // planet6.node.setPosition(1300, 450);
        // planet6.node.setScale(0.5, 0.5);
        // planetRootNode.addChild(planet6.node);
        // plantes.push(planet6);
    }

    public run() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // headNode.setPosition(headNode.position.x + 1, 50);
            // headNode.update();
            this.planetRootNode.update();

            // head_bg.draw(ctx);
            // head_frame.draw(ctx);
            // name_bg.draw(ctx);
            // playerName.draw(ctx);
            // coin.draw(ctx);
            // coinLbl.draw(ctx);

            for(let i = 0; i < this.plantes.length; i++) {
                this.plantes[i].draw(this.ctx);
            }
    }
}