import { ScheduleObject } from 'model/Schedule';
import { instantiationByTag } from 'utils/TagUtil';

export const instantiationBySchedules = (schedules:any) => {
    return schedules.map((schedule:any)=> new ScheduleObject(new Date(schedule.currentDate), new Date(schedule.startDate), new Date(schedule.endDate),  instantiationByTag(schedule.tag), schedule.id, schedule.title, schedule.contents))
}

export const setTime = (date:Date) => {
    const currentDate = new Date();

    date.setHours(currentDate.getHours());
    date.setMinutes(currentDate.getMinutes());
    date.setSeconds(currentDate.getSeconds());

    return date;
}