import { useEffect, useState } from "react";



interface PlanetCanvasProps {
    canvas: HTMLCanvasElement;
    position: {x: number, y: number};
}

interface ISprite {
    img: HTMLImageElement|null;
    // x: number;
    // y: number;
    width: number;
    height: number;
    // scale: number;
}

const draw = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number) => {
    ctx.drawImage(img, x - img.width * 0.5, y - img.height * 0.5);
}


export const PlanetCanvas = (props : PlanetCanvasProps) => {
    console.log(props);
    const canvas: HTMLCanvasElement = props.canvas!;
    const position = props.position;
    
    const ctx = canvas.getContext('2d')!;
    const [sprite, setImg] = useState<ISprite>({
        img: null,
        width: 0,
        height: 0
    });
    
    console.log(sprite.img);

    useEffect(() => {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadImg();
        ctx.font = "24px Arial";
        ctx.fillStyle = '#ffff00';
        const text = 'Hello 12';
        const txtMetrix = ctx.measureText(text);
        const textHeight = txtMetrix.actualBoundingBoxAscent + txtMetrix.actualBoundingBoxDescent;
        console.log(txtMetrix.width, textHeight);
        ctx.fillText(text, position.x - txtMetrix.width * 0.5, position.y + textHeight * 0.5 + 40);
    });

    const loadImg = () => {
        if(sprite.img != null) {
            // ctx.drawImage(sprite.img, 0, 0);
            draw(ctx, sprite.img, position.x, position.y);
            return;
        }

        let _img = new Image();
        _img.src = "../assets/main/robot.png";
        // 加载背景图片
        _img.onload = () => {
            setImg({
                img: _img,
                width: _img.width,
                height: _img.height
            });
            
            draw(ctx, _img, position.x, position.y);
        }

  }
    return (
        <div className="planet-canvas">
            {/* <div className="planet-canvas__inner">
                <canvas className="canvas_box" ref={canvasRef}></canvas>
            </div> */}
        </div>
    )
}