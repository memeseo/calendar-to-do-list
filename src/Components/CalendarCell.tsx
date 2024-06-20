import {Cell, Day, CellTop, AddSchedule, Schedule, CellMiddle} from 'asset/CalendarCells';
import { GoPlus } from "react-icons/go";
import { useState } from 'react';
import { format } from 'date-fns';
import { motion } from "framer-motion";
import { CellObject } from 'model/Cell';
import {TagNameWrapper} from 'asset/CalendarModal';
import { ScheduleObject } from 'model/Schedule';

interface Props {
    day : CellObject;
    index : number;
    onDateClick(date: CellObject): void
    onScheduleClick(schedule: ScheduleObject, date:CellObject): void,
    height : number
}

export const CalendarCell = ({day, index, onDateClick, height, onScheduleClick} : Props) => {
    const [isHover, setHover] = useState<boolean>(false);
  
    const isToday = (date:Date) => {
        const currentDate = new Date();
        return format(currentDate,'yyyy-MM-dd') === format(date,'yyyy-MM-dd');
    }

    const isWeekend = (date:Date) => {
        const day = date.getDay();

        return day === 0 || day === 6;
    }

    return (
        <>
            <Cell key={index} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} $isWeekend={isWeekend(day.startDate)} $cellbg={day.isCurrentMoth()} height={height}>
                <CellTop>
                    <AddSchedule $isHover={isHover} onClick={() => onDateClick(day)}>
                        <motion.button><GoPlus/></motion.button>
                    </AddSchedule>
                    <Day $isToday={isToday(day.startDate)} $cellColor={day.isCurrentMoth()}>{format(day.startDate, 'd') === "1" ? format(day.startDate, 'M월 d일') : format(day.startDate, 'd')}</Day>
                </CellTop>
                <CellMiddle>
                {
                    day.scheduleList.map((schedule, sindex) => ( 
                        <Schedule onClick={() => onScheduleClick(schedule, day)} key={sindex}>
                            <div>{schedule.title}</div>
                            <TagNameWrapper color={schedule.tag.color}>{schedule.tag.name}</TagNameWrapper>
                        </Schedule>
                    ))
                }
                </CellMiddle>

  
            </Cell>
        </>
    )
}