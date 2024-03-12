import { Tag } from 'model/Tag';

export class ScheduleObject {
    _title : string;
    _contents : string;
    _selectedTag : Tag | null;

    constructor(){
        this._title = "";
        this._contents = "";
        this._selectedTag = null;
    }

    get selectedTag(){
        return this._selectedTag as Tag;
    }

    set selectedTag(tag:Tag){
        this._selectedTag = tag;
    }
}