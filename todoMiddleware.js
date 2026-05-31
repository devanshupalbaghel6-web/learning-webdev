const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
    console.log(req.headers);
	const token = req.headers.token;
	const decoded = jwt.verify(token, 'devanshu123');
	const userId = decoded.userId;
    if(userId){
        req.userId = userId
        next()
    }else{
        res.status(403).json({
            message: "malformed token!!!!"
        })
    }
}

module.exports = {authMiddleware};
