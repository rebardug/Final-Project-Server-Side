const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

function verify(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader && authHeader.startWith("Bearer")) {
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) return next(new ErrorResponse('Token is not valid!', 403))
            req.user = user
            console.log(req.user)
            next()
        })
    } else {
        return next(new ErrorResponse('not authenticated!', 401))
    }
}

module.exports=verify