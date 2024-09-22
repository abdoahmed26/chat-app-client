import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userSlice from './Slices/userSlice'
import onlineUsersSlice from './Slices/onlineUsersSlice'
import receivedUserSlice from './Slices/ReceivedUserSlice'

const store = configureStore({
    reducer: {
        user:userSlice,
        onlineUsers:onlineUsersSlice,
        receivedUser:receivedUserSlice,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 

export default store