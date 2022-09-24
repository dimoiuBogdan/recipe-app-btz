import { combineReducers } from '@reduxjs/toolkit'
import { StateType } from 'typesafe-actions';
import { notificationReducer } from '../reducers/notificationReducer'

const reducers = {
    notificationReducer,
}

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction =
    NotificationAction