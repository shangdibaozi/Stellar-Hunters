export class Vec2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public set(x: number, y: number) {
		this.x = x;
		this.y = y;
		return this;
	}

	// 加法
	public add(vec: Vec2): Vec2 {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}

	public addSelf(vec: Vec2): Vec2 {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}

	// 减法
	public sub(vec: Vec2): Vec2 {
		return new Vec2(this.x - vec.x, this.y - vec.y);
	}

	public subSelf(vec: Vec2): Vec2 {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	}

	// 乘法
	public mul(vec: Vec2): Vec2 {
		return new Vec2(this.x * vec.x, this.y * vec.y);
	}

	public div(vec: Vec2): Vec2 {
		return new Vec2(this.x / vec.x, this.y / vec.y);
	}

	public dot(vec: Vec2): number {
		return this.x * vec.x + this.y * vec.y;
	}

	public cross(vec: Vec2): number {
		return this.x * vec.y - this.y * vec.x;
	}

	public len(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public normalize(): Vec2 {
		let len = this.len();
		if (len > 0) {
			return new Vec2(this.x / len, this.y / len);
		} else {
			return new Vec2(0, 0);
		}
	}

	public static distance(vec1: Vec2, vec2: Vec2): number {
		return vec1.sub(vec2).len();
  	}

	public static zero() {
		return new Vec2(0, 0);
	}

	public static one() {
		return new Vec2(1, 1);
	}
	
	public static center() {
		return new Vec2(0.5, 0.5);
	}	
}

