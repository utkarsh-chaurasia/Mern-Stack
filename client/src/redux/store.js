import { configureStore } from '@reduxjs/toolkit';
import userTokenSlice from './Auth/userToken/userTokenSlice';
import postsReducer from './Posts/postsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        userToken: userTokenSlice,
    },
});
