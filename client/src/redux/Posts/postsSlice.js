import { createSlice } from '@reduxjs/toolkit';
import reducers from './postsReducers';


export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
    },
    extraReducers:reducers,
});

// Action creators are generated for each case reducer function

export default postsSlice.reducer;
