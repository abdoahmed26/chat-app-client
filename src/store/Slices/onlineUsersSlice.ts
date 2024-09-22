
import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
    name:"onlineUsersSlice",
    initialState:[],
    reducers:{
        onlineUsers : (state,action)=>{
            state = action.payload
            return state
        },
    }
})

export const {onlineUsers} = onlineUsersSlice.actions

export default onlineUsersSlice.reducer