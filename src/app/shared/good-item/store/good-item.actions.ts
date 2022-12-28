import { Action, createAction, createActionGroup, props } from '@ngrx/store';
import { Good } from '../../../models/good';

export const GoodItemActions = createActionGroup({
    source: 'Good Item',
    events: {
        'Open details' : props<{ good: Good }>(),
    }
})