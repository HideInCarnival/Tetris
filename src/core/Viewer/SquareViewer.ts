import { IViewer } from "../../types";
import { Square } from "../Square";
import { squareShow } from "./gameView.config";
import $ from 'jquery'
export class SquareViewer implements IViewer{
    constructor(
        private square: Square,
        private container: JQuery<HTMLElement>
    ) {}
    private isRemove: boolean = false;
    private dom?: JQuery<HTMLElement>
    show() {
        if(this.isRemove) {
            return
        }
        if (!this.dom) {
            this.dom = $('<div>').css({
                width: squareShow.width,
                height: squareShow.height,
                position: 'absolute',
                border: '1px solid #f40',
                boxSizing: 'border-box'
            }).appendTo(this.container);
        }
        this.dom.css({
            left: this.square.position.x * squareShow.width,
            top: this.square.position.y * squareShow.height,
            background: this.square.color
        })
    }
    remove() {
        if (this.dom && !this.isRemove) {
            this.dom.remove();
            this.isRemove = true;
        }
    }
}