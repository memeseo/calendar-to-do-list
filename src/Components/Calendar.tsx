import { CalendarHeader } from "Components/CalendarHeader";
import { CalendarDays } from "Components/CalendarDays";
import { CalendarCells } from "Components/CalendarCells";
import { useState, useMemo, useEffect } from "react";
import { addMonths, subMonths } from "date-fns"
import {CalendarWrapper} from 'asset/Calendar';
import { CalendarObject } from 'model/Calendar';

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date()),
           preMonth  = () => setCurrentMonth(subMonths(currentMonth, 1)),
           nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1)),
           setToday  = () => setCurrentMonth(new Date());
    
    const [currentCalendar, setCurrentCalendar] = useState(new CalendarObject(currentMonth));

    useEffect(()=>{
        setCurrentCalendar(new CalendarObject(currentMonth));
    }, [currentMonth]);

    return (
        <CalendarWrapper>
            <CalendarHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} setToday={setToday}/>
            <CalendarDays/>
            <CalendarCells currentCalendar={currentCalendar}/>
        </CalendarWrapper>
    );
}