const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema;


//Game Schema
const ReviewSchema = mongoose.Schema({
    starRating :{
        type: Number
    },
    comment :{
        type: String
    }
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);

module.exports.getReviewById = function(id, callback){
    Review.findById(id, callback);
}

module.exports.addReview = function(newBook, callback){
    newBook.save(callback);
}

