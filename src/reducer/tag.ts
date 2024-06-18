import { Tag } from 'model/Tag';
import { createSlice } from '@reduxjs/toolkit';


interface TagState {
    tags: Tag[];
}
const initialState: TagState = {
    tags: []
};
const tag = createSlice({
    name: "tag",
    initialState,
    reducers: {
        fetchTags: (state, action) => {
            state.tags = action.payload;
        },
        removeTag: (state, action) => {
            state.tags = action.payload;
        },
        addToTags: (state, action) => {
            state.tags = action.payload;
        }
    },
})

export const { fetchTags, removeTag, addToTags } = tag.actions;

export default tag.reducer;


