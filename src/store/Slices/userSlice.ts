import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{},
    reducers:{
        addUser : (state,action)=>{
            state = action.payload
            return state
        },
        deleteUser :(state)=>{
            state = {}
            return state
        },
    }
})

export const {addUser, deleteUser} = userSlice.actions

export default userSlice.reducer