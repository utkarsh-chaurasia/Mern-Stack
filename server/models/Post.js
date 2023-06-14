import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creator: {
        type: String,
        required: true,
    },
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const Post = mongoose.model('posts', postSchema);

export default Post;
