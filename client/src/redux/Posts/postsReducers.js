import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from './postsActions';
const reducers = {
    [getPosts.fulfilled]: (state, { payload }) => {
        // action.payload = posts
        state.posts = payload;
        state.status = 'succeeded';
    },
    [getPosts.pending]: (state) => {
        state.status = 'loading';
    },
    [getPosts.rejected]: (state) => {
        state.status = 'failed';
    },
    [createPost.fulfilled]: (state, { payload }) => {
        state.posts = [...state.posts, payload];
        state.status = 'succeeded';
    },
    [createPost.pending]: (state) => {
        state.status = 'loading';
    },
    [createPost.rejected]: (state) => {
        state.status = 'failed';
    },
    [updatePost.fulfilled]: (state, { payload }) => {
        state.posts = state.posts.map((post) =>
            post._id === payload._id ? payload : post
        );
        state.status = 'succeeded';
    },
    [updatePost.pending]: (state) => {
        state.status = 'loading';
    },
    [updatePost.rejected]: (state) => {
        state.status = 'failed';
    },
    [deletePost.fulfilled]: (state, { payload }) => {
        state.posts = state.posts.filter((post) => post._id !== payload._id);
        state.status = 'succeeded';
    },
    [deletePost.pending]: (state) => {
        state.status = 'loading';
    },
    [deletePost.rejected]: (state) => {
        state.status = 'failed';
    },
    [likePost.fulfilled]: (state, { payload }) => {
        state.posts = state.posts.map((post) =>
            post._id === payload._id ? payload : post
        );
        state.status = 'succeeded';
    },
    [likePost.pending]: (state) => {
        state.status = 'loading';
    },
    [likePost.rejected]: (state) => {
        state.status = 'failed';
    },
};
export default reducers;
