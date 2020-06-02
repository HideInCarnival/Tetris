import { Shape,Position, Direction } from '../types/index'
import { panelSize } from './Game.config'
import { SquareGroup } from './SquareGroup'
import { Square } from './Square'

function isPointer(obj:any): obj is Position {
    if (typeof obj.x === "undefined") {
        return false
    }
    return true;
}
export class TetrisRule {
    static canIMove(shape: Shape, target: Position, exist: Square[]): boolean {
        const targetSquares: Position[] = shape.map(p => {
            return {
                x: target.x + p.x,
                y: target.y + p.y
            }
        })
        //边界判断
        let result =  targetSquares.some( p => {
            return p.x < 0 || p.x > panelSize.width - 1 || p.y < 0 || p.y > panelSize.height - 1
        })
        if (result) {
            return false;
        }
        //判断方块之间是否有重叠
        result = targetSquares.some( p => exist.some(sq => sq.position.x === p.x && sq.position.y === p.y) );
        if (result) {
            return false;
        }
        return true;
    } 
    static move(tetris: SquareGroup, targetPoint: Position, exist: Square[]): boolean;
    static move(tetris: SquareGroup, direction: Direction, exist: Square[]): boolean;
    static move(tetris: SquareGroup, targetPointOrDirection: Position | Direction, exist: Square[]):boolean {
        if (isPointer(targetPointOrDirection)) {
            if (this.canIMove(tetris.shape, targetPointOrDirection, exist)) {
                tetris.centerPoint = targetPointOrDirection;
                return true
            }
            return false
        }else {
            const direction = targetPointOrDirection;
            let targetPoint: Position;
            if(direction === Direction.down) {
                targetPoint = {
                    x: tetris.centerPoint.x,
                    y: tetris.centerPoint.y + 1
                }
            }else if (direction === Direction.left) {
                targetPoint = {
                    x: tetris.centerPoint.x - 1,
                    y: tetris.centerPoint.y
                }
            }else {
                targetPoint = {
                    x: tetris.centerPoint.x + 1,
                    y: tetris.centerPoint.y
                }
            }
            return this.move(tetris, targetPoint, exist)
        }
    }

    static moveDirectly(tetris: SquareGroup, direction: Direction, exist: Square[]) {
        while (this.move(tetris, direction, exist)){
        }
    }

    static rotate(tetris: SquareGroup, exist: Square[]): boolean {
        const newShape = tetris.afterRotateShape();
        if (this.canIMove(newShape, tetris.centerPoint, exist)) {
            tetris.rotate();
            return true;
        }else {
            return false;
        }
    }

    static deleteLine(exist: Square[]): number {
        const ys = exist.map( sq => sq.position.y);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        let clearNum: number= 0;
        for(let i = minY; i <= maxY; i ++) {
            if(this.clearLine(exist, i)) {
                clearNum ++;
            }
        }
        return clearNum;
    }

    static clearLine(exist: Square[], y: number): boolean {
        const sqs = exist.filter( sq => sq.position.y === y);
        if (sqs.length === panelSize.width) {
            sqs.forEach( sq => {
                if (sq.viewer) {
                    sq.viewer.remove();
                }
                const index = exist.indexOf(sq);
                exist.splice(index, 1);
            });
            exist.filter( sq => sq.position.y < y).forEach( sq => sq.position = {
                x: sq.position.x,
                y: sq.position.y + 1
            })
            return true;
        }
        return false;
    }
}