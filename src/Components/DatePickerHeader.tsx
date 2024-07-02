import { ScheduleObject } from "model/Schedule";
import { DatePrickerHeader, ShowDate } from 'asset/DatePickerWrapper';
interface IProps {
    schedule : ScheduleObject;
    setEndDateToggle(toggleState:boolean) : void;
    endDateToggle: boolean,
    endDate: string
}

export const DatePickerHeader = ({schedule, setEndDateToggle, endDateToggle, endDate}:IProps) => {
    
    return (
        <DatePrickerHeader>
            <div className="endDateToggleWrapper">
                <div>종료일</div>
                <div>
                    <input role="switch" type="checkbox" defaultChecked={endDateToggle} onChange={() => setEndDateToggle(!endDateToggle)}/>
                </div>
            </div>
            <ShowDate $endDateToggle={endDateToggle}>
                <input value={schedule.startDate} disabled/>
                {
                    endDateToggle && <input value={endDate} disabled/>
                }
            </ShowDate>
        </DatePrickerHeader>
    )
} 