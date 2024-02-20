import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';
import { CalenderCell } from 'model/CalendarCell';
import { CalendarCell } from 'Components/CalendarCell';
import { CellWrapper } from 'asset/CalendarCells';
import { useEffect, useState } from 'react';
import { CalendarModal } from 'Components/CalendarModal';

interface Props {
    currentMonth : Date
}


export const CalendarCells = ({currentMonth} : Props) => {
    const monthStart = startOfMonth(currentMonth),
          monthEnd   = endOfMonth(currentMonth),
          startDate  = startOfWeek(monthStart),
          endDate    = endOfWeek(monthEnd);

    let days = [],
        day  = startDate;

    while(day <= endDate){
        days.push(new CalenderCell(currentMonth, day));
        day = addDays(day, 1);
    }

    const [selectedDate, setSelectedDate] = useState<CalenderCell | null>(null);
    const [isModalOpen, setModalOpenState] = useState(false);

    const onDateClick = (day:CalenderCell) => {
        setSelectedDate(day);
        setModalOpenState(true);
    };

    const onOverlayClick = () => {
        setModalOpenState(false);
    }

    useEffect(()=>{
        console.log('>>> ', selectedDate)
    }, [selectedDate]);

    return (
        <>
            <CellWrapper>
                {
                    days.map((day, index)=>(
                        <CalendarCell day={day} index={index} onDateClick={onDateClick}/>
                    ))
                }
            </CellWrapper>
            <CalendarModal isModalOpen={isModalOpen} onOverlayClick={onOverlayClick} selectedDate={selectedDate}/>
        </>

    )
}