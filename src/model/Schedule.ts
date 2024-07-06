import { Tag } from 'model/Tag';

export class ScheduleObject {
    _currentDate : Date;
    _startDate : Date;
    _endDate : Date;
    _tag : Tag | null;
    _id: string;
    _title : string;
    _contents : string;


    constructor(currentDate:Date, startDate:Date, endDate:Date, tag:Tag | null, id:string, title:string, contents:string){
        this._currentDate = currentDate;
        this._startDate = startDate;
        this._endDate = endDate;
        this._tag = tag;
        this._id = id;
        this._title = title;
        this._contents = contents;
    }
    get currentDate(){
        return this._startDate;
    }

    set currentDate(currentDate:Date){
        this._currentDate = currentDate;
    }

    get startDate(){
        return this._startDate;
    }

    set startDate(startDate:Date){
        this._startDate = startDate;
    }

    get endDate(){
        return this._endDate;
    }

    set endDate(endDate:Date){
        this._endDate = endDate;
    }

    get tag(){
        return this._tag as Tag;
    }

    set id(id:string){
        this._id = id;
    }
    get id(){
        return this._id;
    }

    set tag(tag:Tag){
        this._tag = tag;
    }

    get title(){
        return this._title;
    }

    set title(title: string){
        this._title = title;
    }

    get contents(){
        return this._contents;
    }

    set contents(contents: string){
        this._contents = contents;
    }
}