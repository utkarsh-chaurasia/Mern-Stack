import React,{useState,useEffect} from 'react';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import memories from '../../images/memories.png';
import classes from './styles';
import { logout } from '../../redux/Auth/userToken/userTokenSlice';

const Navbar = () => {

    const userToken = localStorage.getItem('userToken');
    const [userObj,setUserObj] = useState(userToken?jwt_decode(userToken):null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setUserObj(userToken?jwt_decode(userToken):null);
    }, [userToken]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        dispatch(logout());
        navigate('/');
    }
    return (
        <AppBar sx={classes.appBar} position='static' color='inherit'>
            <div style={classes.brandContainer}>
                <Typography
                    component={Link}
                    to='/'
                    variant='h2'
                    sx={classes.heading}
                    align='center'
                >
                    Memories
                </Typography>
                <img
                    style={classes.image}
                    src={memories}
                    alt='memories'
                    height={60}
                />
            </div>
            <Toolbar sx={classes.toolbar}>
                {userObj ? (
                    <div style={classes.profile}>
                        <Avatar
                            sx={classes.purple}
                            alt={userObj.name}
                            src={userObj.picture}
                        >
                            {userObj.name[0]}
                        </Avatar>
                        <Typography variant='h6' sx={classes.userName}>
                            {userObj.name}
                        </Typography>
                        <Button
                            variant='contained'
                            sx={classes.logout}
                            color='secondary'
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to='/auth'
                        variant='contained'
                        color='primary'
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
