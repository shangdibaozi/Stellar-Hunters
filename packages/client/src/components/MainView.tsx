import { useEffect } from "react";
import { Planet } from "./Planet";
import { PlanetCanvas } from "./PlanetCanvas";
import { Sprite } from "../core/Sprite";
import { Node } from "../core/Node";
import { Label } from "../core/Label";
import { Vec2 } from "../core/vec";
import { Global, View } from "../Global";

export class MainView extends Node {

    planetRootNode: Node = new Node();

    playBtn: Node = null!;

    playBtnCallback: Function | null = null;

    createSprite(imgName: string, x: number, y: number, scale: number) {
        let planet = new Sprite();
        planet.url = `../assets/main/${imgName}.png`;
        planet.setLocalPosition(x, y);
        planet.setScale(scale, scale);
        this.planetRootNode.addChild(planet);
        return planet;
    }

    createPlanet(imgName: string, x: number, y: number, scale: number, name: string='', nameOffsetY: number = 30) {
        // let planet = new Sprite(`../assets/main/${imgName}.png`);
        // planet.node.setLocalPosition(x, y);
        // planet.node.setScale(scale, scale);
        // this.planetRootNode.addChild(planet.node);
        // this.renderObjs.push(planet);
        let planet = this.createSprite(imgName, x, y, scale);
        if(name.length > 0) {
            let planetName = new Label(name);
            planetName.text = name;
            planetName.fontSize = 22;
            planetName.color = '#ffffff';
            planetName.setAnchor(0.5, 0.5);
            planetName.setLocalPosition(0, nameOffsetY);
            planet.addChild(planetName);
        }
        return planet;
    }

    createPlanetDesc() {
        let node = new Node();
        node.setLocalPosition(-10, -50);

        let img1 = new Sprite();
        img1.url = '../assets/main/tip_frame.png';
        img1.setAnchor(0, 0);

        let lblName = new Label();
        lblName.text = 'Gamma';
        lblName.fontSize = 36;
        lblName.setAnchor(0.5, 1);
        lblName.setLocalPosition(190, 13);

        let imgFree = new Sprite();
        imgFree.url = '../assets/main/FREE.png';
        imgFree.setAnchor(0.5, 1);
        imgFree.setLocalPosition(310, 13);

        let playBtnBg = new Sprite();
        playBtnBg.url = '../assets/main/PLAY.png';
        playBtnBg.setLocalPosition(280, 220);
        this.playBtn = playBtnBg;
        

        let desc = new Label();
        desc.text = 'copper ore, iron ore, silver ore,platinum ore, tin ore, titanium ore, shaft ore';
        desc.fontSize = 22;
        desc.maxWidth = 300;
        desc.setAnchor(0.5, 0);
        desc.setLocalPosition(280, 90);

        let head = new Sprite();
        head.url = '../assets/main/head_icon.png';
        head.setLocalPosition(140, 50);

        let head_count = new Label();
        head_count.text = '1000';
        head_count.fontSize = 22;
        head_count.setAnchor(0, 0.5);
        head_count.setLocalPosition(10, 0);

        let clock = new Sprite();
        clock.url = '../assets/main/clock_icon.png';
        clock.setLocalPosition(360, 50);

        let clock_number = new Label();
        clock_number.text = '00:00';
        clock_number.fontSize = 22;
        clock_number.setAnchor(0, 1);
        clock_number.setLocalPosition(15, 9);

        node.addChild(img1);
        node.addChild(playBtnBg);
        node.addChild(desc);
        node.addChild(lblName);
        node.addChild(imgFree);
        node.addChild(head);
        head.addChild(head_count);
        node.addChild(clock);
        clock.addChild(clock_number);
        return node;
    }

    init() {
        this.addChild(this.planetRootNode);

        let background = new Sprite();
        background.url = '../assets/main/background.png';
        background.setAnchor(0, 0);
        background.setLocalPosition(0, 0);
        this.addChild(background);
        
        let head_bg = new Sprite();
        head_bg.url = '../assets/main/head_background.png';
        head_bg.setLocalPosition(0, 0);
        
        let head_frame = new Sprite();
        head_frame.url = '../assets/main/head_frame.png';
        head_frame.setLocalPosition(0, 0);
        this.planetRootNode.addChild(head_frame);

        let name_bg = new Sprite();
        name_bg.url = '../assets/main/name_background.png';
        name_bg.setAnchor(0, 0.5);
        name_bg.setLocalPosition(50, -20);
        this.planetRootNode.addChild(name_bg);

        let playerName = new Label();
        playerName.text = 'Player Name';
        playerName.fontSize = 22;
        playerName.setAnchor(0.5, 0.5);
        playerName.setLocalPosition(86.5, -2);
        name_bg.addChild(playerName);

        let coin = new Sprite();
        coin.url = '../assets/game/coin1.png';
        coin.setAnchor(0, 0.5);
        coin.setLocalPosition(50, 20);

        let coinLbl = new Label();
        coinLbl.text = '12345';
        coinLbl.fontSize = 22;
        coinLbl.setAnchor(0, 0.5);
        coinLbl.setLocalPosition(30, 0);
        coin.addChild(coinLbl);

        let headNode = new Node('headNode');
        this.planetRootNode.addChild(headNode);
        headNode.setLocalPosition(50, 50);
        headNode.addChild(head_bg);
        headNode.addChild(head_frame);
        headNode.addChild(name_bg);
        headNode.addChild(coin);

        this.createSprite('Public', 720, 730, 1);
        this.createSprite('Private', 1383, 346, 1);

        this.createPlanet('planet_y', 450, 745, 1);
        this.createPlanet('planet_a', 745, 583, 1);
        let selectPlanet = this.createPlanet('planet_p', 920, 880, 1);
        this.createPlanet('planet_select', 920, 880, 1);
        this.createPlanet('player_1', 1175, 476, 1, 'Starry sky rose');
        this.createPlanet('player_2', 1625, 396, 1, '1000 resources', 40);
        this.createPlanet('player_3', 1535, 216, 1, 'Can make money', 40);
        this.createPlanet('player_4', 1450, 546, 1, 'Super planet', 40);
        this.createPlanet('player_5', 1195, 230, 1, 'Dig together', 60);

        let markUI = this.createPlanetDesc();
        selectPlanet.addChild(markUI);

        let coin1 = this.createSprite('circle_corner_frame', 1600, 30, 1);
        this.createSprite('U_Coin', 1550, 30, 1);
        let coin_u_count = new Label();
        coin_u_count.text = '1234567';
        coin_u_count.fontSize = 22;
        coin_u_count.setLocalPosition(10, 0);
        coin1.addChild(coin_u_count);

        let coin2 = this.createSprite('circle_corner_frame', 1800, 30, 1);
        this.createSprite('Star_Coin', 1750, 30, 1);
        let coin_star_count = new Label();
        coin_star_count.text = '1234567';
        coin_star_count.fontSize = 22;
        coin_star_count.setLocalPosition(10, 0);
        coin2.addChild(coin_star_count);
    }

    public onMouseDown(x: number, y: number) {
        if(this.playBtn && this.playBtn.rect.intersect(x, y)) {
            if(this.playBtnCallback != null) {
                this.playBtnCallback();
            }
        }
    }

    public  onMouseUp(x: number, y: number) { 

    }

    public  onMouseMove(x: number, y: number) {

    }
}