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

    const getDays = () => {
        let days = currentCalendar.cells,
            day  = startDate;

        while(day <= endDate){
            // cell 객체 생성
            days.push(new CellObject(currentCalendar.currentMonth, day));
            day = addDays(day, 1);
        }
        
        return days;
    };

    const [selectedDate, setSelectedDate] = useState<CellObject | null>(null);
    const [isModalOpen, setModalOpenState] = useState(false);

    const onDateClick = (cell:CellObject) => {
        setSelectedDate(cell);
        setModalOpenState(true);
    };

    const onOverlayClick = () => {
        setSelectedDate(null);
        setModalOpenState(false);
    }

    return (
        <>
            <CellWrapper>
                {
                    getDays().map((day, index)=>(
                        <CalendarCell day={day} index={index} onDateClick={onDateClick}/>
                    ))
                }
            </CellWrapper>
            {
                selectedDate ? (
                    <CalendarModal isModalOpen={isModalOpen} onOverlayClick={onOverlayClick} selectedDate={selectedDate}/>
                ) : ''
            }
        </>

    )
}