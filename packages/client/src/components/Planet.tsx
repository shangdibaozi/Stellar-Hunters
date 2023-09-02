import { useRef } from "react"

interface IProp {
    position: {x: number, y: number};
    width: number;
    height: number;
}

export const Planet = (props: IProp) => {     
    // const { position, scale } = props;
    // return (
    //     <div>
    //         <img
    //             style={{
    //                 position: 'absolute',
    //                 top: position.y,
    //                 left: position.x,
    //                 // transform: `scale(${scale})`
    //                 width: scale * 177,
    //                 height: scale * 177,
    //             }}
    //             src="../assets/main/planet.png"
    //         />
    //         {/* <p style={{color: 'white', fontSize: 22,}}>123455</p> */}
    //     </div>
    // );

    const canvasRef = useRef(null);

    return (
        <canvas ref={canvasRef} 
            width={props.width}
            height={props.height}/>
    );

}
