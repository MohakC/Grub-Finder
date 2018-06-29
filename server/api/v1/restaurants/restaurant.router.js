const router = require('express').Router();
const Restaurant = require('./restaurants.entity');
const User = require('../auth/auth.entity');
const axios = require('axios');
const JWT = require('../auth/jwtVerifier');
const Service = require('./restaurant.service');
const zomato_api_key = "3f0106768425b7d4fd1495430f9952ac";

// /api/v1/restaurants/
// request body contains city and cuisine that the user is looking for
router.post('/', JWT.authenticateJWT, (req, response) => {
	let city = req.body["city"];
	let cuisine = req.body["cuisine"];
	axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, {
		headers: {
			"user-key": zomato_api_key,
		}
	})
	.then((res) => {
		let city_id = res.data["location_suggestions"][0]["id"];
		axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${city_id}`, {
			headers: {
				"user-key": zomato_api_key,
			}
		})
		.then((res) => {
			let cuisine_id;
			res.data["cuisines"].forEach((e) => {
				if (e["cuisine"]["cuisine_name"].toUpperCase() === cuisine.toUpperCase()) {
					cuisine_id = e["cuisine"]["cuisine_id"];
				}
			});
			axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${city_id}&entity_type=city&cuisines=${cuisine_id}`, {
				headers: {
					"user-key": zomato_api_key,
				}
			})
			.then((res) => {
				let zomato_data = res.data["restaurants"];	
				zomato_data.forEach((e) => {
					let data = {};
					data["res_id"] = e["restaurant"]["id"];
					data["name"] = e["restaurant"]["name"];
					data["location"] = e["restaurant"]["location"]["city"];
					data["average_cost_for_two"] = e["restaurant"]["average_cost_for_two"];
					data["currency"] = e["restaurant"]["currency"];
					data["cuisines"] = e["restaurant"]["cuisines"];
					data["thumb"] = e["restaurant"]["thumb"];
					Service.addRestaurant(data);
				});
				response.send({message: "Added to DB"});
			});
		});
	});
});

// /api/v1/restaurants/initial
// request body contains restaurants to be displayed when user has just logged in
router.post('/initial', JWT.authenticateJWT, (req, res) => {
	let data = req.body["restaurants"];
	Restaurant.findOne(data[0], (err, doc) => {
		if (doc) {
			res.send({message : "Already added to DB"});
		} else {
			data.forEach((e) => Service.addRestaurant(e));
			res.send({message : "Added to DB"});
		}
	});
});

// /api/v1/restaurants/<city>/<cuisine>
router.get('/:city/:cuisine', JWT.authenticateJWT, (req, res) => {
	const cuisine = req.params.cuisine;
	const city = req.params.city;
	Service.getRestaurants(city, cuisine).then((value) => {
		res.json({data: value});
	});
});

// /api/vi/restaurants/favorites
// request body contains the restaurant id of the restaurant to be added to a user's favorites
router.post('/favorites', JWT.authenticateJWT, (req, res) => {
	JWT.decodeToken(req.headers.authorization).then((username) => {
		User.findOne({ "username" : username}, (err, docs) => {
			Restaurant.findOne({"res_id" : req.body["res_id"]}, (err2, doc) => {
				if (docs["restaurants"].map((e) => e["res_id"]).includes(doc["res_id"])) {
					res.send({message : "This restaurant is already in your favourites"});
				} else {
					docs["restaurants"].push(doc);
					docs.save((err, update) => {
						res.send({message : "Added to favourites"});
					});
				}
			});
		});
	});
});

// /api/vi/restaurants/favorites
router.get('/favorites', JWT.authenticateJWT, (req, res) => {
	JWT.decodeToken(req.headers.authorization).then((username) => {
		User.findOne({ "username" : username}, (err, docs) => {
			res.json({restaurants : docs["restaurants"]});
		});
	});
});

// /api/vi/restaurants/favorites/<res_id> 
router.delete('/favorites/:res_id', JWT.authenticateJWT, (req, res) => {
	const res_id = req.params.res_id;
	JWT.decodeToken(req.headers.authorization).then((username) => {
		User.findOne({ "username" : username}, (err, docs) => {
			if (docs === null) {
				res.send({message : ("This restaurant is not added to your favourites")});
			} else {
				docs["restaurants"].splice(docs["restaurants"].map((e) => e["res_id"])
					.findIndex((e) => e === res_id), 1);
				docs.save((err, update) => {
					res.send({message : ("Deleted from favourites")});
				});
			}
		});
	});
});

// /api/vi/restaurants/reviews
// request body contains the restaurant id and the review to add
router.post('/reviews', JWT.authenticateJWT, (req, res) => {
	JWT.decodeToken(req.headers.authorization).then((username) => {
		User.findOne({ "username" : username}, (err, docs) => {
			let index = docs["restaurants"].map((e) => e["res_id"]).findIndex((e) => e === req.body["res_id"]);
			let toUpdate = `restaurants.${index}.reviews`;
			let updatedInfo = {};
			updatedInfo[toUpdate] = req.body["review"];
			User.update({"username" : username}, { $push: updatedInfo}, (err) => {
				res.send({message : ("Review Added")});
			});
		});
	});
});

// /api/vi/restaurants/reviews
// request body contains the restaurant id and the review to remove
router.put('/reviews', JWT.authenticateJWT, (req, res) => {
	JWT.decodeToken(req.headers.authorization).then((username) => {
		User.findOne({ "username" : username}, (err, docs) => {
			let index = docs["restaurants"].map((e) => e["res_id"]).findIndex((e) => e === req.body["res_id"]);
			let toUpdate = `restaurants.${index}.reviews`;
			let updatedInfo = {};
			updatedInfo[toUpdate] = req.body["review"];
			User.update({"username" : username}, { $pull: updatedInfo}, (err) => {
				res.send({message : ("Review Deleted")});
			});
		});
	});
});

module.exports = router;