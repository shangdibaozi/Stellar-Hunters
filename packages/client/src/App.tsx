import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { MainView } from "./components/MainView";
import { useEffect, useRef } from "react";
import { GameView } from "./components/GameView";
import { Global, View } from "./Global";

export const App = () => {
    //获取canvas元素节点
    const canvasRef = useRef(null);
    const canvas: HTMLCanvasElement = canvasRef.current!;
    useEffect(() => {
        if(!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d')!;

        // 设置canvas的宽度和高度为窗口的宽度和高度
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 在canvas上进行绘制等操作
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        // window.addEventListener("click", (event) => {
        //     console.log(event.clientX, event.clientY);
        //     console.log('---------------------------------');
        // });
        let mainView = new MainView(canvas);
        let gameView = new GameView(canvas);

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

        

        let gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
