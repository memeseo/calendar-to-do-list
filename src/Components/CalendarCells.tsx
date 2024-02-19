import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';
import { CalenderCell } from 'model/CalendarCell';
import { CalendarCell } from 'Components/CelendarCell';
import { CellWrapper } from 'asset/CalendarCells';

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
    console.log('>>> ', days)

    return (
        <CellWrapper>
            {
                days.map((day, index)=>(
                    <CalendarCell day={day} index={index}/>
                ))
            }
        </CellWrapper>
    )
}