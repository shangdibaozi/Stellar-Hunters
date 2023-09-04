import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { MainView } from "./components/MainView";
import { useEffect, useRef } from "react";
import { GameView } from "./components/GameView";
import { Global, View } from "./Global";
import { Node } from "./core/Node";

export const App = () => {
    //获取canvas元素节点
    const canvasRef = useRef(null);
    const canvas: HTMLCanvasElement = canvasRef.current!;

    const designWidth = 2048;
    const designHeight = 1200;
    const aspectRatio = designWidth / designHeight;

    let root = new Node();
    root.setAnchor(0, 0);

    let updateViewPort = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let ratio = window.innerWidth / window.innerHeight;
        if(ratio == aspectRatio) {
            console.log('perfect');
            let scale = window.innerWidth / designWidth;
            root.width = window.innerWidth;
            root.height = window.innerHeight;
            root.setScale(scale, scale);
            root.setLocalPosition(0, 0);
        }
        else if(ratio > aspectRatio) { // fit height
            let scale = window.innerHeight / designHeight;
            let offsetX = (window.innerWidth - designWidth * scale) / 2;

            root.width = designWidth * scale;
            root.height = window.innerHeight;
            root.setScale(scale, scale);
            root.setLocalPosition(offsetX, 0);
        }
        else if(ratio < aspectRatio) { // fit width
            let scale = window.innerWidth / designWidth;
            let offsetY = (window.innerHeight - designHeight * scale) / 2;

            root.width = window.innerWidth;
            root.height = designHeight * scale;
            root.setScale(scale, scale);
            root.setLocalPosition(0, offsetY);
        }
    };

    useEffect(() => {
        if(!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d')!;

        // 设置canvas的宽度和高度为窗口的宽度和高度
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        updateViewPort();
        // 在canvas上进行绘制等操作
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        // window.addEventListener("click", (event) => {
        //     console.log(event.clientX, event.clientY);
        //     console.log('---------------------------------');
        // });
        
        let mainView = new MainView(canvas, root);
        let gameView = new GameView(canvas, root);

        canvas.addEventListener('pointerdown', (event) => {
            // console.log('pointerdown', event);
            mainView.onMouseDown(event.clientX, event.clientY);
        });
		canvas.addEventListener('pointermove', (event) => {
            // console.log('pointermove', event);
            mainView.onMouseMove(event.clientX, event.clientY);
        });
		canvas.addEventListener('pointerup', (event) => {
            // console.log('pointerup', event);
            mainView.onMouseUp(event.clientX, event.clientY);
        });

        //窗口大小改变监听
        window.onresize = function () {
            updateViewPort();
        }

        let gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            if(Global.currView === View.Main) {
                mainView.run();
            }
            else if(Global.currView === View.Game) {
                gameView.run();
            }
        }

        const interval = setInterval(gameLoop, 1000 / 30);
        return () => {
            clearInterval(interval);
        };
    });

    const {
        components: { Counter },
        systemCalls: { increment },
    } = useMUD();

    const counter = useComponentValue(Counter, singletonEntity);

    return (
        <canvas className="canvas_box" ref={canvasRef} style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
        }}/>
    );
};
