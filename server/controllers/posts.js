import mongoose from 'mongoose';
import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const createPost = async (req, res) => {
    if (!req.userId)
        return res.status(401).json({ message: 'Unauthenticated' });

    const post = req.body;
    const newPost = new Post({ ...post, creator: req.userId });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    if (!req.userId)
        return res.status(401).json({ message: 'Unauthenticated' });

    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'No post with that id' });

    let post = await Post.findById(_id);
    if (post.creator !== req.userId)
        return res.status(403).json({ message: 'Forbidden' });

    post = { ...req.body, _id, creator: req.userId };

    const updatedPost = await Post.findByIdAndUpdate(_id, post, {
        new: true,
    });
    res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
    if (!req.userId)
        return res.status(401).json({ message: 'Unauthenticated' });

    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'No post with that id' });
    const post = await Post.findById(_id);
    if (post.creator !== req.userId)
        return res.status(403).json({ message: 'Forbidden' });

    const deletedPost = await Post.findByIdAndDelete(_id);
    res.status(200).json(deletedPost);
};
export const likePost = async (req, res) => {

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    const { id: _id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'No post with that id' });

    const post = await Post.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // dislike the post
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(_id, post, {
        new: true,
    });
    res.status(200).json(updatedPost);
};
