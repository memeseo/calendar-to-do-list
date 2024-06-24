import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';
import { CellObject } from 'model/Cell';
import { ScheduleObject } from 'model/Schedule';
import { CalendarCell } from 'Components/CalendarCell';
import { CellWrapper } from 'asset/CalendarCells';
import { useEffect, useState } from 'react';
import { CalendarModal } from 'Components/CalendarModal';
import { CalendarObject } from 'model/Calendar';
import { format} from 'date-fns';
import { getSchedulesByDate } from 'apis/ScheduleApi';
import store from 'reducer/index';
import { fetchCalendar } from 'reducer/calendar';
import { setLoading } from 'reducer/ui';

interface Props {
    currentCalendar : CalendarObject
}

export const CalendarCells = ({currentCalendar}:Props) => {
    
    const monthStart = startOfMonth(currentCalendar.currentMonth),
          monthEnd   = endOfMonth(currentCalendar.currentMonth),
          startDate  = startOfWeek(monthStart),
          endDate    = endOfWeek(monthEnd);

    const getDays = async () => {
        currentCalendar.cells = [];
        let days = currentCalendar.cells,
            day = startDate,
            promises = [];
    
        while (day <= endDate) {

            promises.push(getSchedulesByDate(day));
            days.push(new CellObject(currentCalendar.currentMonth, day));
            day = addDays(day, 1);
        }
    
        const scheduleList = await Promise.all(promises);
        scheduleList.forEach((schedules, index) => {
            days[index].scheduleList = schedules;
        });
    
        return days;
    };

    const [selectedDate, setSelectedDate] = useState<CellObject | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleObject | null>(null);
    const [isModalOpen, setModalOpenState] = useState(false);

    const onScheduleClick = (schedule:ScheduleObject, cell:CellObject) => {
        setSelectedDate(cell);
        setSelectedSchedule(schedule);
        setModalOpenState(true);
        document.body.style.overflow = 'hidden';
    }

    const onDateClick = (cell:CellObject) => {
      
        setSelectedDate(cell);
        setSelectedSchedule(null);
        setModalOpenState(true);
        document.body.style.overflow = 'hidden';
    };

    const onOverlayClick = () => {
        setSelectedDate(null);
        setSelectedSchedule(null);
        setModalOpenState(false);
        document.body.style.overflow = 'auto';
    }
    const [days, setDays] = useState<CellObject[]>([]);
    
    useEffect(()=> {
        store.dispatch(setLoading(true));
        
        getDays().then(res => {
            setDays(res);
            store.dispatch(setLoading(false));
        })

        store.dispatch(fetchCalendar(currentCalendar));
    }, [currentCalendar.currentMonth])

    const getWeekRange = (date:Date) => {
        const dayOfWeek = date.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; 
        const monday = new Date(date);
        monday.setDate(date.getDate() + diffToMonday);

        return { monday };
    };
  
    const getCellHeight = (date:Date) => {

        const isSunDay = date.getDay();
        let newDate = date;

        if(isSunDay === 0){
            newDate = new Date(date);
            newDate.setDate(date.getDate() + 7);
        }

        const { monday }  = getWeekRange(newDate),
              mondayIndex = days.findIndex(day => format(day._startDate, 'MM-dd') === format(monday, 'MM-dd')),
              copyDays    = JSON.parse(JSON.stringify(days)),
              week        = copyDays.splice(mondayIndex, 7);

        const maxSchedules = week.reduce( (prev:CellObject, value:CellObject) => {
            return prev._scheduleList >= value._scheduleList ? prev : value
        });  
        const maxScheduleLength = maxSchedules._scheduleList.length;

        return maxScheduleLength * 50 + 40 + maxScheduleLength * 20;
    }

    return (
        <>
            <CellWrapper>
                {
                    days.map((day, index) => {
                        const height = getCellHeight(day._startDate)
                        return(
                            <CalendarCell key={index} day={day} index={index} onDateClick={onDateClick} onScheduleClick={onScheduleClick} height={height}/>
                        )
                    })
                }
            </CellWrapper>
            {
                isModalOpen && (
                    <CalendarModal isModalOpen={isModalOpen} onOverlayClick={onOverlayClick} selectedDate={selectedDate} selectedSchedule={selectedSchedule}/>
                )
            }
        </>

    )
}