import tag from 'reducer/tag';
import calendar from 'reducer/calendar';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export default configureStore({
    reducer : {
        tag: tag,
        calendar : calendar
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
})
export const reducers = combineReducers({
    tag: tag,
    calendar : calendar
  })
  
  export type RootState = ReturnType<typeof reducers>