import { format } from 'date-fns/format'
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import { HeaderWrapper, DateWrapper, DataButtonWrapper } from 'asset/CalendarHeader';

type Props = {
    currentMonth : Date,
    preMonth : () => void,
    nextMonth : () => void,
    setToday : () => void
}

export const CalendarHeader = ({currentMonth, preMonth, nextMonth, setToday} : Props) => {
    return (
        <HeaderWrapper>
            <DateWrapper>
                <span>{format(currentMonth, 'yyyy')}년 </span>
                <span>{format(currentMonth, 'M')}월 </span>
            </DateWrapper>
            <DataButtonWrapper>
                <IoIosArrowBack onClick={preMonth}/>
                <button onClick={setToday}> 오늘 </button>
                <IoIosArrowForward onClick={nextMonth}/>
            </DataButtonWrapper>
        </HeaderWrapper>
    )
}