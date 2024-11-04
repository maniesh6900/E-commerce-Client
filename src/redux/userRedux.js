import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name :"user",
    initialState:{
        currentUser: null,
        isFatching: false,
        error: false,
    },
    reducers:{
      loginStart: (state)=>{
        state.isFatching= true;
      },  
      loginSuccess: (state, action)=>{
        state.isFatching= false;
        state.currentUser= action.payload;
      },  
      loginFaliure: (state)=>{
        state.isFatching= false;
        state.error= true;
      },  
    }

})

export const {loginStart, loginSuccess, loginFaliure } = userSlice.actions;
export default userSlice.reducer;