import tag from 'reducer/tag';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export default configureStore({
    reducer : {
        tag: tag
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
})
export const reducers = combineReducers({
    tag: tag
  })
  
  export type RootState = ReturnType<typeof reducers>