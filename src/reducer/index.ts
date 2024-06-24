import tag from 'reducer/tag';
import calendar from 'reducer/calendar';
import ui from 'reducer/ui';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export default configureStore({
    reducer : {
        tag: tag,
        calendar: calendar,
        ui: ui
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
})
export const reducers = combineReducers({
    tag: tag,
    calendar: calendar,
    ui: ui
  })
  
  export type RootState = ReturnType<typeof reducers>