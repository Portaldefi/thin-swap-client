import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userSlice from './userSlice'


export const store = configureStore({
    reducer: {
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
