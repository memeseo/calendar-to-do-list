import { format } from 'date-fns';
import { ScheduleObject } from 'model/Schedule';

export class CellObject {

    _startDate: Date;
    _scheduleList : ScheduleObject[];

    constructor(startDate:Date){
        this._startDate = startDate;
        this._scheduleList = [];
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate:Date){
        this._startDate = startDate;
    }

    get scheduleList() {
        return this._scheduleList;
    }

    set scheduleList(scheduleList: ScheduleObject[]){
        this._scheduleList = scheduleList;
    }
    
    // isCurrentMoth(){
    //     return format(this._currentMonth, "M") === format(this._startDate, "M")
    // }
}