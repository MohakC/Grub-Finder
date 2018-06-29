const mongoose = require('mongoose');

const mongooseConn = function(){
    mongoose.connect('mongodb://localhost:27017/testing');

    // mongoose.connection.on('open', function(){
    //     console.log("mongoose connected");
    // });
}

module.exports = mongooseConn;