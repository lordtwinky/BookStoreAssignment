const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema;

//User Schema
const ShoppingCartSchema = mongoose.Schema({
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

const ShoppingCart = module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);

module.exports.getShoppingCartById = function(id, callback){
    ShoppingCart.findById(id, callback);
}

module.exports.addShoppingCart = function(newShoppingCart, callback){
    newShoppingCart.save(callback);
}

module.exports.addBookToShoppingCart = function (newBook, shoppingCart, callback) {
    shoppingCart.books.push(newBook);
    shoppingCart.save(callback);
}