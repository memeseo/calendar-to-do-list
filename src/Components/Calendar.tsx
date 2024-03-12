import { CalendarHeader } from "Components/CalendarHeader";
import { CalendarDays } from "Components/CalendarDays";
import { CalendarCells } from "Components/CalendarCells";
import { useState, useMemo } from "react";
import { addMonths, subMonths } from "date-fns"
import {CalendarWrapper} from 'asset/Calendar';
import { CalendarObject } from 'model/Calendar';

export const Calendar = () => {
    const getCelendarObject = useMemo(() => { // 초기 객체화 추후 api 호출
        return new CalendarObject(new Date());
    },[]);

    const currentCalendar = getCelendarObject;
    
    const [currentMonth, setCurrentMonth] = useState<Date>(currentCalendar.currentMonth),
           preMonth  = () => setCurrentMonth(changeObject(subMonths(currentMonth, 1)).currentMonth),
           nextMonth = () => setCurrentMonth(changeObject(addMonths(currentMonth, 1)).currentMonth),
           setToday  = () => setCurrentMonth(changeObject(new Date()).currentMonth);

    const changeObject = (month: Date) => { // 객체 변경 추후 api 호출
        currentCalendar.currentMonth = month;
        return currentCalendar;
    }

    return (
        <CalendarWrapper>
            <CalendarHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} setToday={setToday}/>
            <CalendarDays/>
            <CalendarCells currentCalendar={currentCalendar}/>
        </CalendarWrapper>
    );
}