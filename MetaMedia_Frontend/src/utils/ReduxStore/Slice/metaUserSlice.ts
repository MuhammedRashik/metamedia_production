import { createSlice } from "@reduxjs/toolkit";


const metaUserSlice=createSlice({
    name:"metaUser",
    initialState:{
        metaUserData:{},
    },
    reducers:{
       addMetaUser:(state,action)=>{
        state.metaUserData = {...state.metaUserData,...action.payload}
       },
       clearMetaUser:(state)=>{
           state.metaUserData={}
       },
    }
})

export const {addMetaUser,clearMetaUser} =metaUserSlice.actions

export default metaUserSlice.reducer;