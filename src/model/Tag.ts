export class Tag {
    _color : string;
    _name : string;
    
    constructor(name:string, color:string){
        this._name = name;
        this._color = color;
    }

    get name(){
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }

    get color(){
        return this._color;
    }

    set color(color: string){
        this._color = color;
    }
}