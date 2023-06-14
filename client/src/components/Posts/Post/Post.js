import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { deletePost, likePost } from '../../../redux/Posts/postsActions';
import classes from './styles';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const userToken = localStorage.getItem('userToken');
    let userId = null;
    if (userToken) {
        const decoded = jwt_decode(userToken);
        if (decoded.sub) userId = decoded.sub;
        else userId = decoded.id;
    }

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === userId) ? (
                <>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like${
                              post.likes.length > 1 ? 's' : ''
                          }`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlinedIcon fontSize='small' />
                    &nbsp;{post.likes.length}{' '}
                    {post.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlinedIcon fontSize='small' />
                &nbsp;Like
            </>
        );
    };
    return (
        <Card sx={classes.card}>
            <CardMedia
                sx={classes.media}
                image={
                    post.selectedFile ||
                    'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                }
                title={post.title}
            />
            <div style={classes.overlay}>
                <Typography variant='body2'>
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            {userId === post.creator && (
                <div style={classes.overlay2}>
                    <Button
                        style={{ color: 'white' }}
                        size='small'
                        onClick={() => setCurrentId(post._id)}
                    >
                        <MoreHorizIcon fontSize='medium' />
                    </Button>
                </div>
            )}
            <div style={classes.details}>
                <Typography variant='body2' color='textSecondary'>
                    {post.tags.map((tag) => '#' + tag + ' ')}
                </Typography>
            </div>
            <Typography sx={classes.title} variant='h5' gutterBottom>
                {post.title}
            </Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions sx={classes.cardActions}>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => dispatch(likePost(post._id))}
                >
                    <Likes />
                </Button>
                {userId === post.creator && (
                    <Button
                        size='small'
                        color='primary'
                        onClick={() => dispatch(deletePost(post._id))}
                    >
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};
export default Post;
