import {DaysWrapper} from 'asset/CalendarDays';

export const CalendarDays = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <DaysWrapper>
            {daysOfWeek.map((day:string) => (
                <div key={day}>
                    <>{day}</>
                </div>
            ))}
        </DaysWrapper>
    )
}