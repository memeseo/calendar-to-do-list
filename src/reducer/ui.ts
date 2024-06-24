import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true
}

const ui = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        setLoading: (state, action) => {
            console.log('후아유 너 뉘기야 ', action.payload)
            state.isLoading = action.payload;
        }
    }
});

export const { setLoading } = ui.actions;
export default ui.reducer;