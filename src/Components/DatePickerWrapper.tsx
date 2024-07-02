import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ScheduleObject } from "model/Schedule";
import { Wrapper } from 'asset/DatePickerWrapper';
import { ko } from "date-fns/locale/ko";
import { useEffect, useState, forwardRef } from "react";
import { format} from 'date-fns';
import { DatePickerHeader } from 'Components/DatePickerHeader';

interface Props {
    schedule : ScheduleObject;
}


export const DatePickerWrapper = ({ schedule } : Props) => {
    registerLocale("ko", ko);
    const isEndDate = schedule.endDate?.length > 0 ;
    const [endDateToggle, setEndDateToggle] = useState<boolean>(false); // 종료일 toggle
    const [endDate, setEndDate] = useState(schedule.startDate); // 종료일 날짜
    const [shouldCloseOnSelect, setShouldCloseOnSelect] = useState(false); // datepicker 모달 사용 여부

    const setChangeDate = async (dates:any) => {
      
        schedule.endDate = endDateToggle ? format(dates, 'yyyy-MM-dd HH:mm:ss') : ''; 
        setEndDate(schedule.endDate);
        setShouldCloseOnSelect(false);
    }

    const open = () => { // 모달이 열렸을 때 실행
        setEndDateToggle(isEndDate);
        setEndDate(isEndDate ? schedule.endDate : schedule.startDate);
        endDateToggle && setShouldCloseOnSelect(true);
    }

    useEffect(()=>{

        if(endDateToggle) {
            setShouldCloseOnSelect(true);
        
            !isEndDate && setEndDate(schedule.startDate);
            !isEndDate && (schedule.endDate = schedule.startDate);

        }else {
            schedule.endDate = ''; 
            setEndDate('');
        }
        
    }, [endDateToggle])



    return (
        <Wrapper $endDateToggle={endDateToggle}>
            <DatePicker 
                // selectsRange={true}
                locale="ko"
                selected={schedule && new Date(schedule.startDate)} // currentDate로 변경하기
                dateFormat="yyyy년 MM월 dd일"
                startDate={schedule && new Date(schedule.startDate)}
                endDate={isEndDate ? new Date(schedule.endDate) : new Date(schedule.startDate)}
                minDate={new Date(schedule.startDate)}
                onChange={(dates) => setChangeDate(dates)}
                selectsEnd={endDateToggle}
                onCalendarOpen={() => open()}
                shouldCloseOnSelect={shouldCloseOnSelect}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <DatePickerHeader schedule={schedule} setEndDateToggle={setEndDateToggle} endDateToggle={endDateToggle} endDate={endDate}/>
                )}
            />
            
          
        </Wrapper>
    )    
}