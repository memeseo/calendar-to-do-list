import { format } from 'date-fns';

export class CalenderCell {
    currentMonth: Date;
    startDate: Date

    constructor(currentMonth:Date, startDate:Date){
        this.currentMonth = currentMonth;
        this.startDate = startDate;
    }

    isCurrentMoth(){
        return format(this.currentMonth, "M") === format(this.startDate, "M")
    }
}