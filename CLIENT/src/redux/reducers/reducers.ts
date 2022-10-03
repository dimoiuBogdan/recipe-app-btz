import { combineReducers } from '@reduxjs/toolkit'
import { StateType } from 'typesafe-actions';
import { notificationReducer } from '../reducers/notificationReducer'
import { authReducer } from '../reducers/authReducer'

const reducers = {
    notificationReducer,
    authReducer
}

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction =
    NotificationAction