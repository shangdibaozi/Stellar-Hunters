import { Vec2 } from "./vec";

export class Matrix3 {
    elem: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    static D2R = Math.PI / 180;

    public get angle() {
        return Math.asin(this.elem[1]);
    }

    public get scaleX() {
        return this.elem[0];
    }

    public get scaleY() {
        return this.elem[4];
    }

    public set(sx: number, sy: number, degree: number, tx: number, ty: number) {
        let angle = degree * Matrix3.D2R;
        this.setScale(sx, sy).setRotate(angle).setTranslate(tx, ty);
        return this;
    }


    public setScale(sx: number, sy: number) {
        this.elem[0] = sx;
        this.elem[4] = sy;
        return this;
    }

    setRotate(angle: number) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        this.elem[0] *= c;
        this.elem[1] = s;
        this.elem[3] = -s;
        this.elem[4] *= c;
        return this;
    }

    setTranslate(tx: number, ty: number) {
        this.elem[2] = tx;
        this.elem[5] = ty;
        return this;
    }

    public apply(localPos: Vec2, out: Vec2) {
        out.x = this.elem[0] * localPos.x + this.elem[1] * localPos.y + this.elem[2];
        out.y = this.elem[3] * localPos.x + this.elem[4] * localPos.y + this.elem[5];
    }

    public static multi(aMatrix: Matrix3, bMatrix: Matrix3, out: Matrix3) {
        out.elem[0] = aMatrix.elem[0] * bMatrix.elem[0] + aMatrix.elem[1] * bMatrix.elem[3] + aMatrix.elem[2] * bMatrix.elem[6];
        out.elem[3] = aMatrix.elem[3] * bMatrix.elem[0] + aMatrix.elem[4] * bMatrix.elem[3] + aMatrix.elem[5] * bMatrix.elem[6];
        out.elem[6] = aMatrix.elem[6] * bMatrix.elem[0] + aMatrix.elem[7] * bMatrix.elem[3] + aMatrix.elem[8] * bMatrix.elem[6];

        out.elem[1] = aMatrix.elem[0] * bMatrix.elem[1] + aMatrix.elem[1] * bMatrix.elem[4] + aMatrix.elem[2] * bMatrix.elem[7];
        out.elem[4] = aMatrix.elem[3] * bMatrix.elem[1] + aMatrix.elem[4] * bMatrix.elem[4] + aMatrix.elem[5] * bMatrix.elem[7];
        out.elem[7] = aMatrix.elem[6] * bMatrix.elem[1] + aMatrix.elem[7] * bMatrix.elem[4] + aMatrix.elem[8] * bMatrix.elem[7];

        out.elem[2] = aMatrix.elem[0] * bMatrix.elem[2] + aMatrix.elem[1] * bMatrix.elem[5] + aMatrix.elem[2] * bMatrix.elem[8];
        out.elem[5] = aMatrix.elem[3] * bMatrix.elem[2] + aMatrix.elem[4] * bMatrix.elem[5] + aMatrix.elem[5] * bMatrix.elem[8];
        out.elem[8] = aMatrix.elem[6] * bMatrix.elem[2] + aMatrix.elem[7] * bMatrix.elem[5] + aMatrix.elem[8] * bMatrix.elem[8];
    }

}