import { CalendarHeader } from "Components/CalendarHeader";
import { CalendarDays } from "Components/CalendarDays";
import { CalendarCells } from "Components/CalendarCells";

export const Calendar = () => {
    return (
        <>
            <CalendarHeader/>
            <CalendarDays/>
            <CalendarCells/>
        </>
    );
}