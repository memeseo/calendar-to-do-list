import { CalendarHeader } from "Components/CalendarHeader";
import { CalendarDays } from "Components/CalendarDays";
import { CalendarCells } from "Components/CalendarCells";
import { useState } from "react";
import { addMonths, format, subMonths } from "date-fns"

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date()),
           preMonth = () => setCurrentMonth(subMonths(currentMonth, 1)),
           nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1)),
           setToday = () => setCurrentMonth(new Date());

    return (
        <>
            <CalendarHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} setToday={setToday}/>
            <CalendarDays/>
            <CalendarCells/>
        </>
    );
}