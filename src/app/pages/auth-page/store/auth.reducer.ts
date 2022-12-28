import { createReducer, on } from "@ngrx/store";
import { User } from '../../../models/user';
import { AuthActions, AuthActionsApi } from './auth.actions';

export interface State {
    user: User | null;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: '',
    loading: false
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, { user }) => {
        return { ...state, user, loading: false };
    }),
    on(AuthActions.logout, (state) => ({
        ...state, user: null
    })),
    on(AuthActions.autologin, (state, _) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(AuthActionsApi.loginapifail, (state, { authError }) => {
        return {
            ...state,
            authError,
            loading: false
        }
    }),
    on(AuthActionsApi.loginapi, (state, _) => {
        return {
            ...state,
            loading: true,
            authError: ''
        }
    }),
    on(AuthActionsApi.signupapi, (state, _) => {
        return {
            ...state,
            loading: true,
            authError: ''
        }
    })
)