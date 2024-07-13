import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ScheduleObject } from "model/Schedule";
import { Wrapper } from 'asset/DatePickerWrapper';
import { ko } from "date-fns/locale/ko";
import { useState } from "react";

interface Props {
    schedule : ScheduleObject;
    endDate : Date;
    setEndDate(endDate:Date): void;
}


export const DatePickerWrapper = ({ schedule, endDate, setEndDate } : Props) => {
    registerLocale("ko", ko);

    const setChangeDate = async (dates:any) => {
        let date = dates.length > 1 ? dates[0] : dates;

        setEndDate(date);
        schedule.endDate = date; 

        setOpenState(false);
    }

    const [openState , setOpenState] = useState(false);
    const openDateModal = () => {
        !openState && setOpenState(true);
    }
    return (
        <Wrapper onClick={openDateModal}>
            <DatePicker 
                selectsRange
                locale="ko"
                selected={schedule && schedule.currentDate} // currentDate로 변경하기
                dateFormat="yyyy년 MM월 dd일"
                startDate={schedule && schedule.startDate}
                endDate={endDate}
                minDate={schedule.startDate}
                onChange={(dates) => setChangeDate(dates)}
                selectsEnd={true}
                open={openState}
                onClickOutside={() => setOpenState(false)}
            />
            
        </Wrapper>
    )    
}