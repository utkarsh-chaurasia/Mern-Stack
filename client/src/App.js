import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import {createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/styles';
const App = () => {
    const theme = createTheme();
    
    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes> 
            </Container>
        </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
