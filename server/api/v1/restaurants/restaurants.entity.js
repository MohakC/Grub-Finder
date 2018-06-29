const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let RestaurantSchema = Schema({
    name: String,
    location: String,
	reviews: [],
	res_id: String,
	average_cost_for_two: String,
	currency: String,
	cuisines: String,
	thumb: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);