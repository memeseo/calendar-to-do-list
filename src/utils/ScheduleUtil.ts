import { ScheduleObject } from 'model/Schedule';
import { instantiationByTag } from 'utils/TagUtil';

export const instantiationBySchedules = (schedules:any) => {
    return schedules.map((schedule:any)=> new ScheduleObject(schedule.startDate, instantiationByTag(schedule.tag), schedule.id, schedule.title, schedule.contents))
}