const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema;


//Game Schema
const BookSchema = mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    author :{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.getBookById = function(id, callback){
    Book.findById(id, callback);
}

module.exports.getBookByTitle = function(title, callback){
    const query = {title: title}
    Book.findOne(query, callback);
}

module.exports.getBookByAuthor = function(author, callback){
    const query = {author: author}
    Book.findOne(query, callback);
}

module.exports.getBooksByCategory = function(title, callback){
    const query = {category: category}
    Book.find(query, callback);
}

module.exports.addBook = function(newBook, callback){
    newBook.save(callback);
}


