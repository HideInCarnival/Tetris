import { Position, IViewer } from '../types/index'
export class Square {
    constructor(private _pointer: Position, private _color:string) {}
    private _viewer?: IViewer

    public get viewer() {
        return this._viewer;
    }

    public set viewer(value) {
        this._viewer = value;
        if (this._viewer) {
            this._viewer.show();
        }
    }

    public get position() {
        return this._pointer;
    }

    public set position(val: Position) {
        this._pointer = val;
        if(this._viewer) {
            this._viewer.show();
        }
    }
    
    public get color() {
        return this._color;
    }
};