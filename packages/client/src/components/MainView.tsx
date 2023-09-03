import { useEffect } from "react";
import { Planet } from "./Planet";
import { PlanetCanvas } from "./PlanetCanvas";
import { Sprite } from "../core/Sprite";
import { Node } from "../core/Node";
import { Label } from "../core/Label";
import { Vec2 } from "../core/vec";
import { Global, View } from "../Global";

interface IProp {
    canvas: HTMLCanvasElement;
}


export class MainView {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    planetRootNode: Node = new Node();

    rootNode: Node = new Node();

    renderObjs: (Sprite|Label)[] = [];

    playBtn: Node = null!;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.init();
    }

    createPlanet(x: number, y: number, scale: number, name: string) {
        let planet = new Sprite('../assets/main/planet.png');
        planet.node.setLocalPosition(x, y);
        planet.node.setScale(scale, scale);
        this.planetRootNode.addChild(planet.node);
        this.renderObjs.push(planet);
        if(name.length > 0) {
            let planetName = new Label(name, 22);
            planetName.color = '#ffffff';
            planetName.node.setAnchor(0.5, 0.5);
            planetName.node.setLocalPosition(0, 110);
            planet.node.addChild(planetName.node);
            this.renderObjs.push(planetName);
        }
        return planet.node;
    }

    createPlanetDesc() {
        let node = new Node();
        let img1 = new Sprite('../assets/main/mark.png');
        img1.node.setAnchor(0, 0.5);
        let lblName = new Label('NAME', 36);
        lblName.node.setAnchor(0.5, 1);
        lblName.node.setLocalPosition(170, -5);
        let imgFree = new Sprite('../assets/main/FREE.png');
        imgFree.node.setAnchor(0.5, 1);
        imgFree.node.setLocalPosition(280, -5);

        let imgBoard = new Sprite('../assets/main/board.png');
        imgBoard.node.setAnchor(0, 0);
        imgBoard.node.setLocalPosition(90, 10);

        let playBtnBg = new Sprite('../assets/main/PLAY.png');
        playBtnBg.node.setLocalPosition(170, 190);
        this.playBtn = playBtnBg.node;
        

        let desc = new Label('description description description description description description description description description', 22, 280);
        // let desc = new Label('descriptdes', 22, 111);
        desc.node.setAnchor(0.5, 0);
        desc.node.setLocalPosition(170, 50);

        this.renderObjs.push(img1);
        this.renderObjs.push(lblName);
        this.renderObjs.push(imgFree);
        this.renderObjs.push(imgBoard);
        this.renderObjs.push(playBtnBg);
        this.renderObjs.push(desc);

        node.addChild(img1.node);
        imgBoard.node.addChild(playBtnBg.node);
        imgBoard.node.addChild(desc.node);
        img1.node.addChild(lblName.node);
        img1.node.addChild(imgFree.node);
        img1.node.addChild(imgBoard.node);
        return node;
    }

    init() {
        let centerPos = new Vec2(this.canvas.width / 2, this.canvas.height / 2);

        this.rootNode.addChild(this.planetRootNode);

        let background = new Sprite('../assets/main/background.png');
        background.node.setLocalPosition(centerPos.x, centerPos.y);
        this.renderObjs.push(background);
        this.rootNode.addChild(background.node);
        
        let head_bg = new Sprite('../assets/main/head_background.png');
        head_bg.node.setLocalPosition(0, 0);
        this.renderObjs.push(head_bg);
        
        let head_frame = new Sprite('../assets/main/head_frame.png');
        head_frame.node.setLocalPosition(0, 0);
        this.renderObjs.push(head_frame);
        this.planetRootNode.addChild(head_frame.node);

        let name_bg = new Sprite('../assets/main/name_background.png');
        name_bg.node.setAnchor(0, 0.5);
        name_bg.node.setLocalPosition(50, -20);
        this.renderObjs.push(name_bg);
        this.planetRootNode.addChild(name_bg.node);

        let playerName = new Label('Player Name', 22);
        playerName.node.setAnchor(0.5, 0.5);
        playerName.node.setLocalPosition(86.5, -2);
        name_bg.node.addChild(playerName.node);
        this.renderObjs.push(playerName);

        let coin = new Sprite('../assets/game/coin1.png');
        coin.node.setAnchor(0, 0.5);
        coin.node.setLocalPosition(50, 20);
        this.renderObjs.push(coin);

        let coinLbl = new Label('12345', 22);
        coinLbl.node.setAnchor(0, 0.5);
        coinLbl.node.setLocalPosition(30, 0);
        coin.node.addChild(coinLbl.node);
        this.renderObjs.push(coinLbl);

        let headNode = new Node('headNode');
        this.planetRootNode.addChild(headNode);
        headNode.setLocalPosition(50, 50);
        headNode.addChild(head_bg.node);
        headNode.addChild(head_frame.node);
        headNode.addChild(name_bg.node);
        headNode.addChild(coin.node);

        this.createPlanet(200, 300, 0.75, '');
        let selectPlanet = this.createPlanet(340, 450, 0.9, '');
        this.createPlanet(500, 300, 0.75, '');
        this.createPlanet(1000, 270, 0.5, 'Planet1');
        this.createPlanet(1220, 200, 0.5, 'Planet2');
        this.createPlanet(1040, 540, 0.5, 'Planet3');
        this.createPlanet(1450, 340, 0.5, 'Planet4');
        this.createPlanet(1320, 500, 0.5, 'Planet5');

        let markUI = this.createPlanetDesc();
        selectPlanet.addChild(markUI);
    }

    public run() {
        this.rootNode.update();

        for(let i = 0; i < this.renderObjs.length; i++) {
            this.renderObjs[i].draw(this.ctx);
        }
    }

    public onMouseDown(x: number, y: number) {
        if(this.playBtn.rect.intersect(x, y)) {
            console.log('---');
            Global.currView = View.Game;
        }
    }

    public  onMouseUp(x: number, y: number) { 

    }

    public  onMouseMove(x: number, y: number) {

    }
}