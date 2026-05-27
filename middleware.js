function authMiddleware(req, res, next) {
	const token = req.headers.token;
	if (!token) {
		res.status(403).send({
			message: 'you are not signed in!',
		});
	}
	const decoded = jwt.verify(token, 'devanshu123');
	const username = decoded.username;
	if (!username) {
		res.status(403).json({
			message: 'malformed token.',
		});
		return;
	}
    req.username = username
	next();
}
module.exports = authMiddleware;