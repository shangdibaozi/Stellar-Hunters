import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { MainView } from "./components/MainView";
import { useEffect, useRef } from "react";

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
        //     console.log(canvas.width, canvas.height);
        //     console.log('---------------------------------');
        // });

        let mainView = new MainView(canvas);

        let gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            mainView.run();
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

    console.log(canvasRef.current);
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
