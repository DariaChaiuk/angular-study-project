import { Action, createAction, createActionGroup, props } from '@ngrx/store';
import { Good } from '../../../models/good';
//export const OPEN_DETAILS = 'OPEN_DETAILS';
//export const openDetails = createAction('openDetails', props<{ good: Good }>());

export const GoodActionsViewAllActions = createActionGroup({
    source: 'View All Good',
    events: {
        'Open details' : props<{ good: Good }>(),
    }
})