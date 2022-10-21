import { combineReducers } from '@reduxjs/toolkit'
import { StateType } from 'typesafe-actions';
import { notificationReducer } from '../reducers/notificationReducer'
import { loadingReducer } from '../reducers/loadingReducer'

const reducers = {
    notificationReducer,
    loadingReducer
}

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;