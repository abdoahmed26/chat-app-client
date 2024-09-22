import { createSlice } from "@reduxjs/toolkit";

const receivedUserSlice = createSlice({
    name:"receivedUserSlice",
    initialState:{},
    reducers:{
        addReceivedUser: (state,action)=>{
            state = action.payload
            return state
        },
        deleteReceivedUser :(state)=>{
            state = {}
            return state
        },
    }
})

export const {addReceivedUser , deleteReceivedUser} = receivedUserSlice.actions

export default receivedUserSlice.reducer