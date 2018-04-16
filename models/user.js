const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    email :{
        type: String,
        required: true
    },
    username :{
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    shippingAddress :{
        type: String,
        required: true
    },
    paymentMethod :{
        type: Number,
        required: true
    },
    shoppingCart:{
        type: Schema.Types.ObjectId,
        ref: 'ShoppingCart'
    },
    admin:{
        type:Boolean,
        default: false,
        required: true
    },
    transactions:[{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addTransactionToUser = function (newTransaction, user, callback) {
    user.transactions.push(newTransaction);
    user.save(callback);
}

