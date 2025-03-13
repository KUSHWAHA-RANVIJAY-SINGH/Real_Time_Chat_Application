import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
    initialState: {
        authUser: null,
    }, 
    reducers: {
        setUser: (state, action) => {
            state.authUser = action.payload;
        },
        removeUser: (state) => {
            state.authUser = null;
        },
    },
}); 

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;   // {authUser: null  