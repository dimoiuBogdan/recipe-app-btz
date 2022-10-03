import { createAction, ActionType, getType, Reducer } from 'typesafe-actions';
import { AuthProperties, AuthState } from '../../models/AuthModel';

const actions = {
    setAuthProperties: createAction('setAuthProperties', (payload: AuthProperties) => payload)(),
    clearAuthProperties: createAction('clearAuthProperties')(),
};

export type AuthAction = ActionType<typeof actions>;
export const AuthActions = actions;

const initialState: AuthState = {
    token: '',
    userId: '',
}

export const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case getType(AuthActions.setAuthProperties):
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            };
        case getType(AuthActions.clearAuthProperties):
            return {
                ...state,
                token: '',
                userId: ''
            };
        default:
            return state;
    }
}