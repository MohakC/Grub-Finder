const jwt = require('jsonwebtoken');
const User = require('./auth.entity');
const secret_key = "qweqwe1qdasdasdqweqwe13123123wqeasddqweqwe";
const TIME_OUT = "1d";


const generateToken = function generateJWT(username) {
	return jwt.sign({"username" : username}, secret_key, { expiresIn : TIME_OUT});
};

const decodeToken = function decodeJWT(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret_key, (err, decoded) => {
			resolve(decoded["username"]);
		});
	});
};

//decodes the token and checks if user database contains that username
const authenticateJWT = function authenticate(req, res, next) {
	if (req.headers.authorization === undefined) {
		res.send({message : ("Something went wrong, please enter your username and password again")});
	} else {
		let token = req.headers.authorization;
		decodeToken(token).then((username) => {
			User.findOne({ "username" : username}, (err, docs) => {
				if (err || docs === null) {
					res.send({message : ("You are not allowed to access this resource, please log in again")});
				} else {
					next();
				}
			});
		});
	}
};

module.exports = {
    generateToken,
	decodeToken,
	authenticateJWT
}