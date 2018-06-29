const Restaurant = require('./restaurants.entity');

const addRestaurant = function addRestaurantToDB(req) {
	let newRestaurant = new Restaurant();
	for (let attr in req) {
		newRestaurant[attr] = req[attr];
	}
    newRestaurant.save((err) => {
        if (err) {
			console.log('bad');
            return 'Something went wrong, please try again'
        }
        return 'Restaurant Info Found';
	});
};

//displays the restaurants in the restaurant collection
const getRestaurants = function displayRestaurants(city, cuisine) {
	let cu = new RegExp(cuisine);
	let ci = new RegExp(city);
	return new Promise((resolve, reject) => {
		Restaurant.find({ "cuisines" : { $regex: cu, $options: 'i' },
							"location" : { $regex: ci, $options: 'i' }}, (err, docs) => {;
			if(err) {
				reject(err);
			} else {
				resolve(docs);
			}
		});
	});
};

module.exports = {
    addRestaurant,
    getRestaurants
}
