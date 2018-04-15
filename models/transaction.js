const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema;

//User Schema
const TransactionSchema = mongoose.Schema({
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    totalPrice: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

module.exports.getTransactionById = function (id, callback) {
    Transaction.findById(id, callback);
}

module.exports.addTransaction = function (newTransaction, callback) {
    newTransaction.save(callback);
}
