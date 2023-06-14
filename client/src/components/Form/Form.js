import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux';

import classes from './styles';
import { createPost, updatePost } from '../../redux/Posts/postsActions';

// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id === currentId) : null
    );
    // const {posts,status} = useSelector((state)=>state.posts);
    // console.log(posts,"---",status);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });
    };
    return (
        <Paper sx={classes.paper}>
            {localStorage.getItem('userToken') ? (
                <form
                    autoComplete='off'
                    noValidate
                    style={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Typography variant='h6'>
                        {currentId ? 'Editing' : 'Creating'} a Memory
                    </Typography>
                    <TextField
                        name='title'
                        variant='outlined'
                        label='Title'
                        fullWidth
                        value={postData.title}
                        onChange={(e) =>
                            setPostData({ ...postData, title: e.target.value })
                        }
                    />
                    <TextField
                        name='message'
                        variant='outlined'
                        label='Message'
                        fullWidth
                        value={postData.message}
                        onChange={(e) =>
                            setPostData({
                                ...postData,
                                message: e.target.value,
                            })
                        }
                    />
                    <TextField
                        name='tags'
                        variant='outlined'
                        label='Tags'
                        fullWidth
                        value={postData.tags}
                        onChange={(e) =>
                            setPostData({
                                ...postData,
                                tags: e.target.value.split(','),
                            })
                        }
                    />
                    <div style={classes.fileInput}>
                        <FileBase
                            type='file'
                            multiple={false}
                            onDone={({ base64 }) =>
                                setPostData({
                                    ...postData,
                                    selectedFile: base64,
                                })
                            }
                        />
                    </div>
                    <Button
                        sx={classes.buttonSubmit}
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        onClick={clear}
                        fullWidth
                    >
                        Clear
                    </Button>
                </form>
            ) : (
                <Typography variant='h6'>Sign in to create memories.</Typography>
            )}
        </Paper>
    );
};
export default Form;
