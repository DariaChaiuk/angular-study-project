import * as fromGoodItem from '../shared/good-item/store/good-item.reducer'
import * as fromAuth from '../pages/auth-page/store/auth.reducer';
import * as fromCart from '../pages/cart-page/store/cart.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    goodItem: fromGoodItem.State;
    auth: fromAuth.State,
    cart: fromCart.State
}

export const appReducer: ActionReducerMap<AppState> = {
    goodItem: fromGoodItem.goodItemReducer,
    auth: fromAuth.authReducer,
    cart: fromCart.cartReducer
}