const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = Schema({
	fname: String,
	lname: String,
	username: {type: String, unique: true},
	password: String,
	phone: String,
	address: String,
	email: String,
	restaurants: []
});

module.exports = mongoose.model('User', UserSchema);