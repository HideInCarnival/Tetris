import { Shape,Position } from "../types";
import { Square } from "./Square";
export abstract class SquareGroup {
    private  _squares: readonly Square[] = []
    constructor(
        private _shape: Shape,
        private _centerPoint: Position,
        private _color: string
    ) {
        const sqArr: Square[] = [];
        this._shape.forEach(item => {
            const sq = new Square({x:item.x + this._centerPoint.x, y:item.y + this._centerPoint.y}, this._color);
            sqArr.push(sq);
        })
        this._squares = sqArr;
    }

    public get shape() {
        return this._shape;
    }

    public get squares() {
        return this._squares;
    }

    public get centerPoint() {
        return this._centerPoint
    }

    public set centerPoint(newPoint: Position) {
        this._centerPoint = newPoint;
        this.setSquarePoint();
    }
    //根据中心点坐标设置新的坐标
    private setSquarePoint() {
        this._shape.forEach( (s,i) => {
            this._squares[i].position = {
                x: this._centerPoint.x + s.x,
                y: this._centerPoint.y + s.y
            }
        })
    }
    protected isClock = true;  //默认为顺时针旋转
    afterRotateShape(): Shape {
        if (this.isClock) {
            return this._shape.map(item => {
                const newPos: Position = {
                    x: - item.y,
                    y: item.x
                }
                return newPos;
            })
        }else {
            return this._shape.map(item => {
                const newPos: Position = {
                    x: item.y,
                    y: - item.x
                }
                return newPos;
            })
        }
    }
    rotate() {
        const newShape = this.afterRotateShape();
        this._shape = newShape;
        this.setSquarePoint();
    }
}