import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { userSlice } from '../reducers/userSlice'
import { itemSlice } from '../reducers/itemSlice'


const store = configureStore({
    reducer: combineReducers({ user: userSlice.reducer, item: itemSlice.reducer })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store