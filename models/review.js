const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
    starRating :{
        type: Number
    },
    comment :{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);

module.exports.getReviewById = function(id, callback){
    Review.findById(id, callback);
}

module.exports.addReview = function(newBook, callback){
    newBook.save(callback);
}

