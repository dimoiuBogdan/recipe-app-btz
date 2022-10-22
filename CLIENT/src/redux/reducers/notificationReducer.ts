import { createAction, ActionType, getType, Reducer } from 'typesafe-actions';
import { NotificationState } from '../../models/NotificationModel';

const actions = {
    setPopupProperties: createAction('setPopupProperties', (payload: Omit<NotificationState, 'isOpened' | 'life'>) => payload)(),
    closeNotification: createAction('closeNotification')(),
};

export type NotificationAction = ActionType<typeof actions>;
export const NotificationActions = actions;

const initialState: NotificationState = {
    content: '',
    type: null,
    isOpened: false,
    life: 2000
}

export const notificationReducer: Reducer<NotificationState, NotificationAction> = (state = initialState, action: NotificationAction) => {
    switch (action.type) {
        case getType(NotificationActions.setPopupProperties):
            return {
                ...state,
                content: action.payload.content,
                type: action.payload.type,
                isOpened: true
            };
        case getType(NotificationActions.closeNotification):
            return {
                ...state,
                content: '',
                type: null,
                isOpened: false,
                life: 3000
            };
        default:
            return state;
    }
}