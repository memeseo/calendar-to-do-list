import { CellObject } from "model/Cell";
import { Tag } from 'model/Tag';

export class CalendarObject {
    _currentMonth : Date;
    _cells : CellObject[];
    _tags : Tag[];

    constructor(currentMonth:Date){
        this._currentMonth = currentMonth;
        this._cells = [];
        this._tags = [];
    }

    get currentMonth(): Date{
        return this._currentMonth;
    }

    set currentMonth(currentMonth: Date){
        this._currentMonth = currentMonth;
    }

    get cells(): CellObject[]{
        return this._cells;
    }

    set cells(cells: CellObject[]){
        this._cells = cells;
    }

    get tags(): Tag[]{
        return this._tags;
    }

    set tags(newTags: Tag[]){
        this._tags = newTags;
    }
}