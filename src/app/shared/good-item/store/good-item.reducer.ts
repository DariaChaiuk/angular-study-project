import { createReducer, on } from "@ngrx/store";
import { GoodItemActions } from "./good-item.actions";
import { Good } from 'src/app/models/good';

const initialState: State = {
    selectedItem: {}
};

export interface State {
    selectedItem: Good | {}
}

export const goodItemReducer = createReducer(
    initialState,
    on(GoodItemActions.openDetails, (state, { good }) => ({...state, selectedItem: good}))
)