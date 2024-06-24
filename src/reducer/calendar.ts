import { createSlice } from "@reduxjs/toolkit";
import { CellObject } from "model/Cell";
import { Tag } from 'model/Tag';

interface ICalendar {
    currentMonth : Date;
    cells : CellObject[];
    tags : Tag[];
}

interface ICalendarWrapper {
    calendar: ICalendar;
}
const initialState:ICalendarWrapper = { calendar : {
    currentMonth: new Date(),
    cells: [],
    tags: []
} };

const calendar = createSlice({
    name : 'calendar',
    initialState,
    reducers : {
        fetchCalendar: (state, action) => {
            state.calendar = action.payload;
        }
    }
})

export const { fetchCalendar } = calendar.actions;
export default calendar.reducer;