Angular
    Components
        - login = user login gateway
        - register = user register gateway
        - toolbar = toolbar for top of page that contains title and buttons to switch from search page to favorites page
        - search = two form-fields to query for city and cuisine of potential restaurants
        - restaurant-card = a card that displays a restaurant's data
        - cards-view = multiple restaurant-cards to display search result
        - favorites = multiple restaurant-cards to display user's favorites
    Services
        - auth = checks if JWT is expired or not
        - authguard = activates search and favorites routes dependent on auth service response
        - favorites = calls backend API for all operations on user's favorites
        - login = calls backend API to authenticate user
        - register = calls backend API to register user
        - review = calls backend API to add a review of a restaurant in a user's favorites
        - search = calls backend API to call zomato API for restaurant info and to display results
        - determine-location = determines user's location and generates a few restaurants near that area to display
        - get-jwt = keeps track of user's session through JWT
        - http-interceptor = attaches the JWT in all outgout http requests

Server 
    Endpoints
        - /api/v1/restaurants
            - post = find all restaurants from zomato api for a specific city and cuisine and add to restaruant database
                - request = {
                        "city": "",
                        "cuisine": ""
                    }
                - response = {
                        "status": 200,
                        "message": "Added to DB"
                    }
        - /api/v1/restaurants/initial
            - post = add all restaurants shown in the initial screen to the restaurant database
                - request = {
                        "restaurants": []
                    }
                - response = {
                        "status": 200,
                        "message": "Added to DB"
                    }
        - /api/v1/restaurants/<city>/<cuisine>
            - get = return all restaurants in database for a specific city and cuisine
                - request = {}
                - response = {
                        "status": 200,
                        "data": ""
                    }
        - /api/vi/restaurants/favorites
            - post = add a restaurant to a user's favorites
                - request = {
                        "res_id": ""
                    }
                - response = {
                        "status": 200,
                        "message": "Added to favorites"
                    } or {
                        "status": 200,
                        "message": "This restaurant is already in your favourites"
                    }
        - /api/vi/restaurants/favorites
            - get = return all restaurants in a user's favorites
                - request = {}
                - response = {
                        "status": 200,
                        "restaurants": ""
                    }
        - /api/vi/restaurants/favorites/<res_id> 
            - delete = remove a restaurant from a user's favorites
                - request = {}
                - response = {
                        "status": 200,
                        "message": "Deleted from favourites"
                    } or {
                        "status": 200,
                        "message": "This restaurant is not added to your favourites"
                    }
        - /api/vi/restaurants/reviews
            - post = add a review to a restaurant in a user's favorites
                - request = {
                        "res_id": "",
                        "review": ""
                    }
                - response = {
                        "status": 200,
                        "message": "Review Added"
                    }
        - /api/vi/restaurants/reviews
            - put = remove a review of a restaurant in a user's favorites
                - request = {
                        "res_id": "",
                        "review": ""
                    }
                - response = {
                        "status": 200,
                        "message": "Review Deleted"
                    }
        - /api/v1/users/register
            - post = add a user to the user database
                - request = {
                        "user": {
                            "fname": "",
                            "lname": "",
                            "username": "",
                            "password": "",
                            "phone": "",
                            "address": "",
                            "email": ""
                        }
                    }
                - response = {
                        "status": 400,
                        "message": "err message"
                    } or {
                        "status": 201,
                        "message": "User Created"
                    }
        - /api/v1/users/login
            - post = check user's credentials
                - request = {
                        "username": "",
                        "password": ""
                    }
                - response = {
                        "status": 401,
                        "message": "Invalid username or password"
                    } or {
                        "status": 200,
                        "message": "User Authenticated",
                        "JWT": ""
                    }
    Database schema
        User
            - fname: String
            - lname: String
            - username: {type: String, unique: true}
            - password: String
            - phone: String
            - address: String
            - email: String
            - restaurants: []
        Restaurant 
            - name: String
            - location: String
            - reviews: []
            - res_id: String
            - average_cost_for_two: String
            - currency: String
            - cuisines: String
            - thumb: String