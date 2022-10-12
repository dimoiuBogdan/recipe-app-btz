import { createAction, ActionType, getType, Reducer } from 'typesafe-actions';
import { OverviewState } from '../../models/OverviewModel';
import { AllRecipeModel } from '../../models/RecipeModels';

const actions = {
    setAllRecipes: createAction('setAllRecipes', (payload: { allRecipes: AllRecipeModel[] }) => payload)(),
};

export type OverviewAction = ActionType<typeof actions>;
export const OverviewActions = actions;

const initialState: OverviewState = {
    allRecipes: []
}

export const notificationReducer: Reducer<OverviewState, OverviewAction> = (state = initialState, action: OverviewAction) => {
    switch (action.type) {
        case getType(OverviewActions.setAllRecipes):
            return {
                ...state,
                allRecipes: action.payload.allRecipes
            };
        default:
            return state;
    }
}