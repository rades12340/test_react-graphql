import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailPasswordInput, FieldError, User } from '../generated/graphql';
import userAPI from '../utils/userAPI';

export const registerUser = createAsyncThunk(
    'users/register',
    async (user: EmailPasswordInput, { dispatch }) => {
        return await userAPI.registerUser(user)
    }
)

export const forgotPassword = createAsyncThunk(
    'users/register',
    async (user: EmailPasswordInput, { dispatch }) => {
        return await userAPI.registerUser(user)
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async (user: { email: string, password: string }, { dispatch }) => {
        return await userAPI.loginUser(user.email, user.password)

    }
)

export const me = createAsyncThunk(
    'users/me',
    async (_, { dispatch }) => {

        const response = await userAPI.me()
        dispatch(setUser({ email: response.me.email }))
    }
)

export const logout = createAsyncThunk(
    'users/logout',
    async (_, { dispatch }) => {

        const response = await userAPI.logout()
        dispatch(logoutUser(undefined))
    }
)



interface UserState {
    loginErrors: FieldError[] | undefined;
    registerErrors: FieldError[] | undefined;
    user: User | undefined
}

const INITIAL_STATE: UserState = {
    loginErrors: undefined,
    registerErrors: undefined,
    user: undefined
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            // s
            state.user = action.payload
        },
        setRegisterError(state, action: PayloadAction<FieldError[]>) {
            state.registerErrors = action.payload
        },
        setLoginError(state, action: PayloadAction<FieldError[]>) {
            state.loginErrors = action.payload
        },
        resetErrors(state, action: PayloadAction<undefined>) {
            state.loginErrors = undefined
            state.registerErrors = undefined
        },
        logoutUser(state, action: PayloadAction<undefined>) {
            state.user = undefined
            state.registerErrors = undefined
            state.loginErrors = undefined
        },
    },

});

export const { setUser, setRegisterError, setLoginError, logoutUser, resetErrors } = userSlice.actions




