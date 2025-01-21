const { Router } = require('express')
const { JWT_ADMIN_PASSWORD } = require("../config")
const adminRouter = Router();
const {adminModel, courseModel} = require('../db');

adminRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        // Create a new admin
        await adminModel.create({
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
adminRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    try {
        const response = await adminModel.findOne({ email: email });

        if (!response) {
            return res.status(403).json({
                message: "Couldn't find user"
            });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, response.password);

        if (passwordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ id: response._id }, JWT_ADMIN_PASSWORD);

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


adminRouter.post('/course', async function(req, res, next){
    const adminId = req.id;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title, description, imageUrl, price, creatorId: adminId
    })

    res.json({
        message: 'Course created',
        courseId: course._id
    })
})

adminRouter.put('/course', function(req, res){
    res.json({
        message: "Signup endpoint"
    })
})

adminRouter.get('/course/bulk', function(req, res){
    res.json({
        message: "Signup endpoint"
    })
})

module.exports = {
    adminRouter
}


