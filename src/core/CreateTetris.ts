import { Shape, Position} from "../types";
import { SquareGroup } from "./SquareGroup";
import { getRandom } from "./util";
export class IShape extends SquareGroup {
    constructor(
        _centerPoint: Position,
        _color: string
    ) {
        super([{x: 0, y: 0},{x: 0, y: -1},{x: 0, y: 1},{x: 0, y: 2}], _centerPoint, _color)
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class fieldShape extends SquareGroup {
    constructor(
        _centerPoint: Position,
        _color: string
    ) {
        super([{x: 0, y: 0},{x: 0, y: 1},{x: 1, y: 1},{x: 1, y: 0}], _centerPoint, _color)
    }
    afterRotateShape() {
        return this.shape;
    }
}

export class leftLShape extends SquareGroup {
    constructor(
        _centerPoint: Position,
        _color: string
    ) {
        super([{x: 0, y: 0},{x: 1, y: 0},{x: -1, y: 0},{x: -1, y: -1}], _centerPoint, _color)
    }
}

export class rightLShape extends SquareGroup {
    constructor(
        _centerPoint: Position,
        _color: string
    ) {
        super([{x: 0, y: 0},{x: -1, y: 0},{x: 1, y: 0},{x: 1, y: 1}], _centerPoint, _color)
    }
    // rotate() {
    //     super.rotate();
    //     this.isClock = !this.isClock;
    // }
}

export class TShape extends SquareGroup {
    constructor(
        _centerPoint: Position,
        _color: string
    ) {
        super([{x: 0, y: 0},{x: -1, y: 0},{x: 1, y: 0},{x: 0, y: -1}], _centerPoint, _color)
    }
}

export class leftZShape extends SquareGroup {
    constructor(
        _centerPoint: Position,
        _color: string
    ) {
        super([{x: 0, y: 0},{x: 0, y: -1},{x: 1, y: -1},{x: -1, y: 0}], _centerPoint, _color)
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class rightZShape extends SquareGroup {
    constructor(
        _centerPoint: Position,
        _color: string
    ) {
        super([{x: 0, y: 0},{x: 0, y: -1},{x: -1, y: -1},{x: 1, y: 0}], _centerPoint, _color)
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export const tetrisShapeArr = [
    IShape,
    fieldShape,
    leftLShape,
    rightLShape,
    TShape,
    leftZShape,
    rightZShape
]

export const colorArr: string[] = [
    'yellow',
    'orange',
    'red',
    'lightpink',
    'aqua'
]

export function createTetris(centerPoint: Position): SquareGroup {
    const shape = tetrisShapeArr[getRandom(0,tetrisShapeArr.length)];
    const color = colorArr[getRandom(0, colorArr.length)];
    return new shape(centerPoint, color);
}