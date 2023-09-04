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

    createSprite(imgName: string, x: number, y: number, scale: number) {
        let planet = new Sprite(`../assets/main/${imgName}.png`);
        planet.node.setLocalPosition(x, y);
        planet.node.setScale(scale, scale);
        this.planetRootNode.addChild(planet.node);
        this.renderObjs.push(planet);
        return planet.node;
    }

    createPlanet(imgName: string, x: number, y: number, scale: number, name: string='', nameOffsetY: number = 30) {
        // let planet = new Sprite(`../assets/main/${imgName}.png`);
        // planet.node.setLocalPosition(x, y);
        // planet.node.setScale(scale, scale);
        // this.planetRootNode.addChild(planet.node);
        // this.renderObjs.push(planet);
        let planet = this.createSprite(imgName, x, y, scale);
        if(name.length > 0) {
            let planetName = new Label(name, 22);
            planetName.color = '#ffffff';
            planetName.node.setAnchor(0.5, 0.5);
            planetName.node.setLocalPosition(0, nameOffsetY);
            planet.addChild(planetName.node);
            this.renderObjs.push(planetName);
        }
        return planet;
    }

    createPlanetDesc() {
        let node = new Node();
        node.setLocalPosition(-10, -50);

        let img1 = new Sprite('../assets/main/tip_frame.png');
        img1.node.setAnchor(0, 0);

        let lblName = new Label('Gamma', 36);
        lblName.node.setAnchor(0.5, 1);
        lblName.node.setLocalPosition(190, 13);

        let imgFree = new Sprite('../assets/main/FREE.png');
        imgFree.node.setAnchor(0.5, 1);
        imgFree.node.setLocalPosition(310, 13);

        let playBtnBg = new Sprite('../assets/main/PLAY.png');
        playBtnBg.node.setLocalPosition(280, 220);
        this.playBtn = playBtnBg.node;
        

        let desc = new Label('copper ore, iron ore, silver ore,platinum ore, tin ore, titanium ore, shaft ore', 22, 300);
        desc.node.setAnchor(0.5, 0);
        desc.node.setLocalPosition(280, 90);

        let head = new Sprite('../assets/main/head_icon.png');
        head.node.setLocalPosition(140, 50);

        let head_count = new Label('1000', 22);
        head_count.node.setAnchor(0, 0.5);
        head_count.node.setLocalPosition(10, 0);

        let clock = new Sprite('../assets/main/clock_icon.png');
        clock.node.setLocalPosition(360, 50);

        let clock_number = new Label('00:00', 22);
        clock_number.node.setAnchor(0, 1);
        clock_number.node.setLocalPosition(15, 9);

        this.renderObjs.push(img1);
        this.renderObjs.push(lblName);
        this.renderObjs.push(imgFree);
        this.renderObjs.push(playBtnBg);
        this.renderObjs.push(desc);
        this.renderObjs.push(head);
        this.renderObjs.push(head_count);
        this.renderObjs.push(clock);
        this.renderObjs.push(clock_number);


        node.addChild(img1.node);
        node.addChild(playBtnBg.node);
        node.addChild(desc.node);
        node.addChild(lblName.node);
        node.addChild(imgFree.node);
        node.addChild(head.node);
        head.node.addChild(head_count.node);
        node.addChild(clock.node);
        clock.node.addChild(clock_number.node);
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

        this.createSprite('Public', 650, 615, 1);
        this.createSprite('Private', 1318, 230, 1);

        this.createPlanet('planet_y', 380, 625, 1);
        this.createPlanet('planet_a', 685, 470, 1);
        let selectPlanet = this.createPlanet('planet_p', 850, 770, 1);
        this.createPlanet('planet_select', 850, 770, 1);
        this.createPlanet('player_1', 1110, 360, 1, 'Starry sky rose');
        this.createPlanet('player_2', 1560, 280, 1, '1000 resources', 40);
        this.createPlanet('player_3', 1470, 100, 1, 'Can make money', 40);
        this.createPlanet('player_4', 1385, 430, 1, 'Super planet', 40);
        this.createPlanet('player_5', 1130, 114, 1, 'Dig together', 60);

        let markUI = this.createPlanetDesc();
        selectPlanet.addChild(markUI);

        let coin1 = this.createSprite('circle_corner_frame', 1600, 30, 1);
        this.createSprite('U_Coin', 1550, 30, 1);
        let coin_u_count = new Label('1234567', 22);
        coin_u_count.node.setLocalPosition(10, 0);
        this.renderObjs.push(coin_u_count);
        coin1.addChild(coin_u_count.node);

        let coin2 = this.createSprite('circle_corner_frame', 1800, 30, 1);
        this.createSprite('Star_Coin', 1750, 30, 1);
        let coin_star_count = new Label('1234567', 22);
        coin_star_count.node.setLocalPosition(10, 0);
        this.renderObjs.push(coin_star_count);
        coin2.addChild(coin_star_count.node);
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