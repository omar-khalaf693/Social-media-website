import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice" ,
    initialState: {
        user : JSON.parse(localStorage.getItem("user")),
        isLoggedin : JSON.parse(localStorage.getItem("user")) != null,

    },
    reducers: {
        setUser : (state , action) =>{
            state.user = action.payload;
            state.isLoggedin = true;
            localStorage.setItem("user" , JSON.stringify(state.user))
        },
        clearUser : (state , action) => {
            state.user = null;
            state.isLoggedin = false;
            localStorage.removeItem("user")
        } ,
    }    
})
export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;