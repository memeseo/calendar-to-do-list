import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';
import { CellObject } from 'model/Cell';
import { CalendarCell } from 'Components/CalendarCell';
import { CellWrapper } from 'asset/CalendarCells';
import { useEffect, useState, useMemo } from 'react';
import { CalendarModal } from 'Components/CalendarModal';
import { CalendarObject } from 'model/Calendar';
import {db} from 'Routes/config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { format} from 'date-fns';
import { getSchedulesByDate } from 'apis/ScheduleApi';
import { ScheduleObject } from 'model/Schedule';

interface Props {
    currentCalendar : CalendarObject
}

export const CalendarCells = ({currentCalendar} : Props) => {
    const monthStart = startOfMonth(currentCalendar.currentMonth),
          monthEnd   = endOfMonth(currentCalendar.currentMonth),
          startDate  = startOfWeek(monthStart),
          endDate    = endOfWeek(monthEnd);

    const getDays = async () => {
        currentCalendar.cells = []; // 생각해보기
        let days = currentCalendar.cells,
            day  = startDate;

        while(day <= endDate){
            // cell 객체 생성
            const schedules = await getSchedulesByDate(day);
       
            days.push(new CellObject(currentCalendar.currentMonth, day, schedules));
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
    const [days, setDays] = useState<CellObject[]>([]);

    useEffect(()=> {
        getDays().then(res => {
            setDays(res);
        })

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
              mondayIndex = days.findIndex(day => day._startDate.getDate() === monday.getDate()),
              copyDays    = JSON.parse(JSON.stringify(days)),
              week        = copyDays.splice(mondayIndex, 7);

        const maxSchedules = week.reduce( (prev:CellObject, value:CellObject) => {
            return prev._scheduleList >= value._scheduleList ? prev : value
        });  

        return maxSchedules._scheduleList.length * 50 + 80;
    }

    return (
        <>
            <CellWrapper>
                {
                    days.map((day, index) => {
                        const height = getCellHeight(day._startDate)
                        return(
                            <CalendarCell day={day} index={index} onDateClick={onDateClick} height={height}/>
                        )
                    })
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