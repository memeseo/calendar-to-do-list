import { format } from 'date-fns';
import { ScheduleObject } from 'model/Schedule';

export class CellObject {
    _currentMonth: Date;
    _startDate: Date;
    _scheduleList : ScheduleObject[];

    constructor(currentMonth:Date, startDate:Date){
        this._currentMonth = currentMonth;
        this._startDate = startDate;
        this._scheduleList = [];
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate:Date){
        this._startDate = startDate;
    }
    
    isCurrentMoth(){
        return format(this._currentMonth, "M") === format(this._startDate, "M")
    }
}