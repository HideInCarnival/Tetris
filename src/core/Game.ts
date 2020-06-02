import { GameStatus, Direction } from "../types";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from "./CreateTetris"
import { TetrisRule } from "./TetrisRule";
import { GamePageViewer } from "./Viewer/GamePageViwer";
import { nextSize, panelSize } from "./Game.config";
import { Square } from "./Square";
export class Game {
    private _gameStatus: GameStatus = GameStatus.init;
    private _curTetris?: SquareGroup;
    private _nextTetris: SquareGroup;
    private _timer?: number;
    private _duration: number = 1000;
    private _exist: Square[] = [];
    private _score: number = 0;
    constructor(private _viewer: GamePageViewer) {
        this._nextTetris = createTetris({x:0, y:0})
        this.createNext();
        this._viewer.init(this);
        this._viewer.showScore(this._score);
    }
    start() {
        if (this._gameStatus === GameStatus.gaming) {
            return;
        }
        if (this._gameStatus === GameStatus.over) {
            this.init();
        }
        this._gameStatus = GameStatus.gaming;
        if (!this._curTetris) {
            this.switchTetris();
        }
        this.autoDrop();
    }
    public get gameStatus() {
        return this._gameStatus;
    }
    private init() {
        this._exist.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        })
        this._exist = [];
        this._curTetris = undefined;
        this._score = 0;
        this.createNext();
    }

    private createNext() {
        this._nextTetris = createTetris({x:0,y:0});
        this.resetNextCenterPoint(nextSize.width,nextSize.height,this._nextTetris);
        this._viewer.showNext(this._nextTetris);
    }
    switchTetris() {//切换方块
        this._curTetris = this._nextTetris;
        this._curTetris.squares.forEach( sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        })
        this.resetMainCenterPoint(panelSize.width, this._curTetris);
        
        //和之前方块重叠，则游戏结束
        if(!TetrisRule.canIMove(this._curTetris.shape, this._curTetris.centerPoint, this._exist)) {
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            this._curTetris.squares.forEach(sq => {
                if (sq.viewer) {
                    sq.viewer.remove();
                }
            })
            this._viewer.showOver();
            return;
        }
        this._viewer.switch(this._curTetris);
        this.createNext();
    }

    autoDrop() {//当前方块自由下落
        if (this._timer || this._gameStatus !== GameStatus.gaming) {
            return;
        }
        this._timer = setInterval( ()=> {
            if (this._curTetris) {
                if(!TetrisRule.move(this._curTetris, Direction.down, this._exist)) {
                    this.hitBottom();
                };
            }
        }, this._duration)
    }

    pause() {
        if(this._gameStatus === GameStatus.gaming) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.showPause();
        }
    }
    controlLeft() {
        if(this._curTetris && this._gameStatus === GameStatus.gaming) {
            TetrisRule.move(this._curTetris, Direction.left, this._exist)
        }
    }
    controlRight() {
        if(this._curTetris && this._gameStatus === GameStatus.gaming) {
            TetrisRule.move(this._curTetris, Direction.right, this._exist)
        }
    }
    controlDown() {
        if(this._curTetris && this._gameStatus === GameStatus.gaming) {
            TetrisRule.moveDirectly(this._curTetris, Direction.down, this._exist);
            this.hitBottom();
        }
    }
    rotate() {
        if(this._curTetris && this._gameStatus === GameStatus.gaming) {
            TetrisRule.rotate(this._curTetris, this._exist);
        }
    }
    //设置方块初始位置
    private resetNextCenterPoint(containerWidth: number, containerHeight:number, tetris: SquareGroup) {
        const x = Math.floor(containerWidth / 2) - 1;
        const y = Math.floor(containerHeight / 2) - 1;
        tetris.centerPoint = {
            x,
            y
        }
    }
    private resetMainCenterPoint(containerWidth: number, tetris: SquareGroup) {
        const x = Math.floor(containerWidth / 2) - 1;
        tetris.centerPoint = {
            x,
            y: 0
        }
        while (tetris.squares.some( sq => sq.position.y < 0)) {
            tetris.centerPoint = {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1
            }
        }
    }

    //触底处理
    private hitBottom() {
        //添加已存在的方块
        this._exist = this._exist.concat(this._curTetris!.squares);
        //处理移除
        const num:number = TetrisRule.deleteLine(this._exist);
        //切换方块
        this.switchTetris();
        //积分
        this.addScore(num);
    }
    private addScore(clearNum: number) {
        if (clearNum === 0) {
            return
        }else {
            this._score += Math.pow(5, clearNum);
            this._viewer.showScore(this._score);
        }
    }
}