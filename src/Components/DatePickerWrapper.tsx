import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ScheduleObject } from "model/Schedule";
import { Wrapper, DatePrickerHeader, ShowDate } from 'asset/DatePickerWrapper';
import { ko } from "date-fns/locale/ko";
import { useState } from "react";

interface Props {
    schedule : ScheduleObject;
}

export const Test = ({schedule}:Props) => {
    const [endDateToggle, setEndDateToggle] = useState<boolean>(false);

    return (
        <DatePrickerHeader>
            <div className="endDateToggleWrapper">
                <div>종료일</div>
                <div>
                    <input role="switch" type="checkbox" onChange={() => setEndDateToggle(!endDateToggle)}/>
                </div>
            </div>
            <ShowDate $endDateToggle={endDateToggle}>
                <input value={schedule.startDate} disabled/>
                {
                    endDateToggle && <input value={schedule.startDate} disabled/>
                }
            </ShowDate>
        </DatePrickerHeader>
    )
}

export const DatePickerWrapper = ({ schedule } : Props) => {
    registerLocale("ko", ko);

    return (
        <Wrapper className="testtest">
            <DatePicker locale="ko" selected={schedule && new Date(schedule.startDate)} dateFormat="yyyy년 MM월 dd일"
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
            }) => (
                <Test schedule={schedule}/>
            )}
            />
            
          
        </Wrapper>
    )    
}