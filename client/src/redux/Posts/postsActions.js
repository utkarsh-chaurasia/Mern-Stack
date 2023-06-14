import * as api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action Creators
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const { data } = await api.fetchPosts();
    return data;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    const { data } = await api.createPost(post);
   
    return data;
});
export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
    const { data } = await api.updatePost(post);
    return data;
});
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const { data } = await api.deletePost(id);
    return data;
});
export const likePost = createAsyncThunk('posts/likePost', async (id) => {
    const { data } = await api.likePost(id);
    return data;
});
