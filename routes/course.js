const { Router } = require('express')

const courseRouter = Router();

courseRouter.post('purchase', function(req, res){
    // User is expected to pay here
    res.json({
        message: 'Course purchase'
    })
})

courseRouter.get('preview', function(req, res){
    res.json({
        message: 'Your courses'
    })
})


module.exports = {
    courseRouter
}
