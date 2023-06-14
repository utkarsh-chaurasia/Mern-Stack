// import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('No user with that email');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Incorrect password');
        const token = jwt.sign(
            { name: user.name, email: user.email, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).send('User already exists');

        if (password !== confirmPassword)
            return res.status(400).send('Passwords do not match');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign(
            { name: newUser.name, email: newUser.email, id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
