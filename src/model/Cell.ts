import { ScheduleObject } from 'model/Schedule';
import { format } from 'date-fns';

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

    isWeekend(){
        const day = this.startDate.getDay();
        return day === 0 || day === 6;
    }

    isCurrentMoth(currentMonth:Date){
        return format(currentMonth, "M") === format(this.startDate, "M");
    }
}