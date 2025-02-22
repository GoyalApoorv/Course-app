const jwt = require('jsonwebtoken')
const { JWT_USER_PASSWORD } = require('../../config')

function userMiddleware(req, res, next) {
    const token = req.body.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if(decoded) {
        req.id = decoded._id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware
}