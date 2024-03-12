import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';
import { CellObject } from 'model/Cell';
import { CalendarCell } from 'Components/CalendarCell';
import { CellWrapper } from 'asset/CalendarCells';
import { useEffect, useState, useMemo } from 'react';
import { CalendarModal } from 'Components/CalendarModal';
import { CalendarObject } from 'model/Calendar';

interface Props {
    currentCalendar : CalendarObject
}

export const CalendarCells = ({currentCalendar} : Props) => {
    const monthStart = startOfMonth(currentCalendar.currentMonth),
          monthEnd   = endOfMonth(currentCalendar.currentMonth),
          startDate  = startOfWeek(monthStart),
          endDate    = endOfWeek(monthEnd);

    const getDays = useMemo(() => {
        let days = currentCalendar.cells,
            day  = startDate;

        while(day <= endDate){
            days.push(new CellObject(currentCalendar.currentMonth, day));
            day = addDays(day, 1);
        }
        
        return days;
    }, [currentCalendar.currentMonth]);

    const [selectedDate, setSelectedDate] = useState<CellObject>();
    const [isModalOpen, setModalOpenState] = useState(false);

    const onDateClick = (day:CellObject) => {
        setSelectedDate(day);
        setModalOpenState(true);
    };

    const onOverlayClick = () => {
        setModalOpenState(false);
    }

    return (
        <>
            <CellWrapper>
                {
                    getDays.map((day, index)=>(
                        <CalendarCell day={day} index={index} onDateClick={onDateClick}/>
                    ))
                }
            </CellWrapper>
            {
                selectedDate ? (
                    <CalendarModal isModalOpen={isModalOpen} onOverlayClick={onOverlayClick} selectedDate={selectedDate} currentCalendar={currentCalendar}/>
                ) : ''
            }
        </>

    )
}