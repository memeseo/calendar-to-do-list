export class Tag {
    _color : string;
    _name : string;
    _id: string;

    constructor(name:string, color:string, id:string){
        this._name = name;
        this._color = color;
        this._id = id;
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

    get id(){
        return this._id;
    }

    set id(id: string){
        this._id = id;
    }
}