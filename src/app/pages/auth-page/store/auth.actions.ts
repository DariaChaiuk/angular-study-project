import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../models/user';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': props<{ user: User | null}>(),
        'Logout': emptyProps(),
        'AutoLogin': emptyProps()
    }
})

export const AuthActionsApi = createActionGroup({
    source: 'AuthApi',
    events: {
        'LoginApi': props<{ email: string, password: string }>(),
        'LoginApiFail': props<{ authError: string }>(),
        'LogoutApi': emptyProps(),
        'SignUpApi': props<{ email: string, password: string }>(),
    }
})