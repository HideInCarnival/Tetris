import { SquareGroup } from "../core/SquareGroup";
import { Game } from "../core/Game";

export interface Position {
    readonly x: number
    readonly y: number
}

export interface IViewer {
    show(): void
    remove(): void
}
export interface GameViewer {
    showNext(tetris: SquareGroup): void
    switch(tetris: SquareGroup): void
    init(game: Game): void
    showScore(score: number): void
    showPause(): void
    showOver(): void
}

export type Shape = Position[]

export enum Direction {
    left,
    down,
    right
}

export enum GameStatus {
    init,
    gaming,
    pause,
    over
}