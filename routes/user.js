const { Router } = require('express');
const userRouter = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_USER_PASSWORD } = require("../config"); 

const { userModel } = require('../db');

// Signup route
userRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        // Create a new user
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.json({
            message: "Signup succeeded"
        });
    } catch (error) {
        console.error("Error signing up:", error.message);
        res.status(500).json({ message: 'Signup failed' });
    }
});

// Signin route
userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const response = await userModel.findOne({ email: email });

        if (!response) {
            return res.status(403).json({
                message: "Couldn't find user"
            });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, response.password);

        if (passwordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ id: response._id }, JWT_USER_PASSWORD);

            res.json({
                token: token
            });
        } else {
            res.status(403).json({
                message: 'Incorrect credentials'
            });
        }
    } catch (error) {
        console.error("Error during signin:", error.message);
        res.status(500).json({ message: 'Signin failed' });
    }
});

// Purchases route
userRouter.get('/purchases', function (req, res) {
    res.json({
        message: "Your courses"
    });
});

// Export the router
module.exports = {
    userRouter
};
