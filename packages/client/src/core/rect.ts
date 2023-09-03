import { Vec2 } from "./vec";

export class Rect {
    public position: Vec2 = Vec2.zero();
    public width: number = 0;
    public height: number = 0;

    public intersect(x: number, y: number): boolean {
        return x >= this.position.x && x <= this.position.x + this.width &&
            y >= this.position.y && y <= this.position.y + this.height;
    }
}