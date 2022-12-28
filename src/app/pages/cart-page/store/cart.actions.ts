import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Good } from 'src/app/models/good';
import { CartItem } from '../../../models/cart-item';

export const CartActions = createActionGroup({
    source: 'Cart',
    events: {
        'AddItem': props<{ good: Good }>(),
        'RemoveItem': props<{ cartItem: CartItem }>(),
        'UpdateItem': props<{ cartItem: CartItem }>(),
        'LoadItems': emptyProps()
    }
})