import { format } from 'date-fns';
import { ScheduleObject } from 'model/Schedule';

export class CellObject {
    _currentMonth: Date;
    _startDate: Date;
    _scheduleList : ScheduleObject[];

    constructor(currentMonth:Date, startDate:Date, schedules:ScheduleObject[]){
        this._currentMonth = currentMonth;
        this._startDate = startDate;
        this._scheduleList = schedules;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate:Date){
        this._startDate = startDate;
    }

    get currentMonth() {
        return this._currentMonth;
    }

    set currentMonth(currentMonth:Date){
        this._currentMonth = currentMonth;
    }

    get scheduleList() {
        return this._scheduleList;
    }

    set scheduleList(scheduleList: ScheduleObject[]){
        this._scheduleList = scheduleList;
    }
    
    isCurrentMoth(){
        return format(this._currentMonth, "M") === format(this._startDate, "M")
    }
}