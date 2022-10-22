import { createAction, ActionType, getType, Reducer } from 'typesafe-actions';
import { LoadingState } from '../../models/LoadingModel';

const actions = {
    setLoading: createAction('setLoading', (payload: boolean) => payload)(),
};

export type LoadingAction = ActionType<typeof actions>;
export const LoadingActions = actions;

const initialState: LoadingState = {
    loadingState: false
}

export const loadingReducer: Reducer<LoadingState, LoadingAction> = (state = initialState, action: LoadingAction) => {
    switch (action.type) {
        case getType(LoadingActions.setLoading):
            return {
                ...state,
                loadingState: action.payload
            };
        default:
            return state;
    }
}