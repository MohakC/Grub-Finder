const router = require('express').Router();
const User = require('./auth.entity');
const JWT = require('./jwtVerifier');

// /api/v1/users/register
// request body contains all info to create a User
router.post('/register', (req, res) => {
	let newUser = new User();
	for (let attr in req.body) {
		newUser[attr] = req.body[attr];
	}
	newUser.save((err, doc) => {
		if (err) {
			res.status(400).send({ message: 'Username has already been taken' });
		} else {
			res.status(201).send({ message: 'User Created', "user": doc });
		}
	});
});

// /api/v1/users/login
// request body contains username and password of user
router.post('/login', (req, res) => {
    let jwt = JWT.generateToken(req.body["username"]);
	User.find({"username" : req.body["username"], "password" : req.body["password"]}, (err, docs) => {
		if (docs.length === 0) {
			res.status(401).send({ message: 'Invalid username or password'});
		} else {
			res.status(200).json({ message: 'User Authenticated', "JWT": jwt, "user": docs});
		}
	});
});

module.exports = router;