import { format } from 'date-fns';
import { Tag } from 'model/Tag';

export class CalenderCell {
    currentMonth: Date;
    startDate: Date;
    title : string;
    tags : Tag[];
    contents : string;

    constructor(currentMonth:Date, startDate:Date){
        this.currentMonth = currentMonth;
        this.startDate = startDate;
        this.title = "";
        this.tags = [];
        this.contents = "";
    }

    isCurrentMoth(){
        return format(this.currentMonth, "M") === format(this.startDate, "M")
    }
}