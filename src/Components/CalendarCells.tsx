import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek, format} from 'date-fns';
import { CalenderCell } from 'model/CalendarCell';
import { CalendarCell } from 'Components/CalendarCell';
import { CellWrapper } from 'asset/CalendarCells';
import { AnimatePresence, useViewportScroll} from "framer-motion";
import { useEffect, useState } from 'react';
import {CalendarModalWrapper, Overley, ModalTop, ModalDate, ModalTag, ModalContents, ModalSubmit} from 'asset/CalendarModal';
import { FaCalendarDays } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";

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
        setModalOpenState(false)
    }

    const { scrollY } = useViewportScroll();

    useEffect(()=>{
        console.log('>>> ', selectedDate)
    }, [selectedDate])
    return (
        <>
            <CellWrapper>
                {
                    days.map((day, index)=>(
                        <CalendarCell day={day} index={index} onDateClick={onDateClick}/>
                    ))
                }
            </CellWrapper>

            <AnimatePresence>
                {isModalOpen ? (
                    <>
                        <Overley 
                            onClick={onOverlayClick}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}/>

                        <CalendarModalWrapper
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ top: scrollY.get() + 100 }}
                        >
                            <ModalTop>
                                <input type="text" placeholder='제목을 입력해 주세요.'></input>
                            </ModalTop>
                            <ModalDate>
                                <div className="title">
                                    <FaCalendarDays/> 달력
                                </div>
                                <div className="contents">{selectedDate ? format(selectedDate.startDate, 'yyyy M월 d일') : null}</div>
                            </ModalDate>
                            <ModalTag>
                                <div className="title">
                                    <FaHashtag/> 태그
                                </div>
                                <div className="contents"></div>
                            </ModalTag>
                            <ModalContents>
                                <textarea placeholder="내용을 입력해 주세요."></textarea>
                            </ModalContents>
                            <ModalSubmit>
                            <button className="submit-button">등록</button>
                                <button className="cancel-button">취소</button>
                                
                            </ModalSubmit>
                        </CalendarModalWrapper>
                    </>)  : null
                }

            </AnimatePresence>
        </>

    )
}