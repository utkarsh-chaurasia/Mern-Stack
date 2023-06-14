import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

import Input from './Input';
import classes from './styles';
import { login } from '../../redux/Auth/userToken/userTokenSlice';
import { auth, provider } from './Firebase';
import * as api from '../../api';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSignup) {
            const { data: token } = await api.signin(formData);
            if (token) {
                localStorage.setItem('userToken', token);
                dispatch(login(token));
            }
            navigate('/');
        } else {
            const { data: token } = await api.signup(formData);

            if (token) {
                localStorage.setItem('userToken', token);
                dispatch(login(token));
            }
            navigate('/');
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    };
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleGoogleLogin = async () => {
        try {
            const { user } = await signInWithPopup(auth, provider);
            localStorage.setItem('userToken', user.accessToken);
            dispatch(login(user.accessToken));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper sx={classes.paper} elevation={3}>
                <Avatar sx={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5' gutterBottom>
                    {' '}
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form sx={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name='lastName'
                                    label='Last Name'
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name='email'
                            label='Email Address'
                            handleChange={handleChange}
                            type='email'
                        />
                        <Input
                            name='password'
                            label='Password'
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <>
                                <Input
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    handleChange={handleChange}
                                    type='password'
                                />
                            </>
                        )}
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={classes.submit}
                    >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Button
                        sx={classes.googleButton}
                        fullWidth
                        onClick={handleGoogleLogin}
                    >
                        {isSignup
                            ? 'Sign up with Google'
                            : 'Sign in with Google'}
                    </Button>

                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button
                                onClick={switchMode}
                                sx={classes.switchButton}
                            >
                                {isSignup
                                    ? 'Already have an account? Sign In'
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
