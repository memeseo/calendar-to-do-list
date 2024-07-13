import { ScheduleObject } from 'model/Schedule';
import { instantiationByTag } from 'utils/TagUtil';
import { eachDayOfInterval } from 'date-fns';

export const instantiationBySchedules = (schedules:any) => {
    return schedules.map((schedule:any)=> {
        return new ScheduleObject(new Date(schedule.currentDate), new Date(schedule.startDate), new Date(schedule.endDate), schedule.createTime.toDate(), instantiationByTag(schedule.tag), schedule.id, schedule.title, schedule.contents)
    })
}

export const setTime = (date:Date) => {
    const currentDate = new Date();

    date.setHours(currentDate.getHours());
    date.setMinutes(currentDate.getMinutes());
    date.setSeconds(currentDate.getSeconds());

    return date;
}

export const getAllSelectedDates = (currentDate:Date, endDate:Date) => {

    const dates = eachDayOfInterval({ start: currentDate, end: endDate });
    return dates.map(date => {
        return new Date(date);
    });
}

