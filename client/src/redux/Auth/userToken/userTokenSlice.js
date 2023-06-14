import { createSlice } from '@reduxjs/toolkit';
import reducers from './userTokenReducers';

export const userTokenSlice = createSlice({
    name: 'userToken',
    initialState: {
        userToken: null,
    },
    reducers: reducers,
});

// Action creators are generated for each case reducer function
export const { login, logout } = userTokenSlice.actions;
export default userTokenSlice.reducer;
