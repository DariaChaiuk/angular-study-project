import { createReducer, on } from "@ngrx/store";
import { GoodActionsViewAllActions } from './view-all.actions';

const initialState = {
    selectedItem: {}
};

export const viewAllReducer = createReducer(
    initialState,
    on(GoodActionsViewAllActions.openDetails, (state, { good }) => ({...state, selectedItem: good}))
)

// export function viewAllReducer (state = initialState, action: ViewAllActions.OpenDetails){
//     switch (action.type){
//         case ViewAllActions.OPEN_DETAILS:
//             return {
//                 ...state,
//                 selectedItem: action.payload
//             }
//         default: {
//             return state;
//         }
//     }
// }