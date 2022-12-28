import { state } from "@angular/animations";
import { createDirectiveTypeParams } from "@angular/compiler/src/render3/view/compiler";
import { createReducer, on } from "@ngrx/store";
import { CartItem } from "src/app/models/cart-item";
import { CartActions } from './cart.actions';

export interface State {
    cartItems: CartItem[];
}

const initialState: State = {
    cartItems: [],
};

export const cartReducer = createReducer(
    initialState,
    on(CartActions.additem, (state, { good }) => {
        let array: CartItem[] = [...state.cartItems];
        const goodInCartIndex = array.findIndex(x => x.item.id === good.id);
        if(goodInCartIndex !== -1){
             array[goodInCartIndex] = {...array[goodInCartIndex], numberOfItems: array[goodInCartIndex].numberOfItems + 1};
        } else {
            array.push({item: good, numberOfItems: 1});
        }
        localStorage.setItem('cartData', JSON.stringify(array));
        return { ...state, cartItems: array};
    }),
    on(CartActions.updateitem, (state, { cartItem }) => {
        let array: CartItem[] = [...state.cartItems];
        const goodInCartIndex = array.findIndex(x => x.item.id === cartItem.item.id);
        if(cartItem.numberOfItems != 0){
            array[goodInCartIndex] = {...array[goodInCartIndex], numberOfItems: cartItem.numberOfItems};
        }
        else{
            array = array.filter(x => x.item.id !== cartItem.item.id);
        }
        localStorage.setItem('cartData', JSON.stringify(array));
        return { ...state, cartItems: array};
    }),
    on(CartActions.removeitem, (state, { cartItem }) => {
        let array: CartItem[] = [...state.cartItems];
        array = array.filter(x => x.item.id !== cartItem.item.id);
        localStorage.setItem('cartData', JSON.stringify(array));
        return { ...state, cartItems: array};
    }),
    on(CartActions.loaditems, (state, _) => {
        const cartData = localStorage.getItem('cartData');
        if(cartData){
            const cartDataObj = JSON.parse(cartData);
            return {...state, cartItems: cartDataObj}
        }
        return { ...state};
    })

)