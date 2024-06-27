import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true
}

const ui = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setLoading } = ui.actions;
export default ui.reducer;