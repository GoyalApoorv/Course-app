const router = require('express');
const userRouter = Router();

userRouter.post('/signup', function(req, res){
    res.json({
        message: 'You are signed up'
    })
})

userRouter.post('/signin', function(req, res){
    res.json({
        message: 'You are signed in'
    })
})

userRouter.get('/purchases', function(req, res){
    res.json({
        message: "You're courses"
    })
})