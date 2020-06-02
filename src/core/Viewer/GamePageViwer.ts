import { GameViewer, GameStatus } from "../../types";
import { SquareGroup } from "../SquareGroup";
import { SquareViewer } from "./SquareViewer";
import $ from 'jquery';
import { Game } from "../Game";
import { squareShow } from "./gameView.config";
import { panelSize, nextSize, controlSize, scoreSize } from "../Game.config";
export class GamePageViewer implements GameViewer {
    private $next = $("#next");
    private $gameBox = $(".game-box");
    private $controlers = $("#controlers");
    private $score = $("#score");
    private $mask = $(".mask");
    showScore(score: number): void {
        this.$score.html(`${score}`);
    }
    showPause(): void {
        this.$mask.html('<div class="content">游戏暂停</div>');
        this.$mask.css({
            display: 'flex'
        })
    }
    showOver(): void {
        this.$mask.html('<div class="content">游戏结束</div>');
        this.$mask.css({
            display: 'flex'
        })
    }
    init(game: Game): void {
        this.$gameBox.css({
            width: squareShow.width * panelSize.width,
            height: squareShow.height * panelSize.height
        })
        this.$next.css({
            width: squareShow.width * nextSize.width,
            height: squareShow.height * nextSize.height
        })
        this.$controlers.css({
            width: squareShow.width * controlSize.width,
            height: squareShow.height * controlSize.height
        })
        this.$score.css({
            width: squareShow.width * scoreSize.width,
            height: squareShow.height * scoreSize.height
        })
        $(document).on('keydown',function (e) {
            switch(e.keyCode) {
                case 32:
                    if (game.gameStatus === GameStatus.gaming) {
                        game.pause();
                    }else {
                        game.start();
                    }
                case 37: 
                    game.controlLeft();
                    break;
                case 38:
                    game.rotate();
                    break;
                case 39:
                    game.controlRight();
                    break;
                case 40:
                    game.controlDown();
                    break;
            }
        })
    }
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach( sq => {
            sq.viewer = new SquareViewer(sq, this.$next);
        })
    }
    switch(tetris: SquareGroup): void {
        tetris.squares.forEach( sq => {
            sq.viewer!.remove();
            sq.viewer = new SquareViewer(sq, this.$gameBox);
        })
    }

}