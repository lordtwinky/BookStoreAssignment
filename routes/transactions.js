const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Book = require('../models/book');
const Transaction = require('../models/transaction');
const User = require('../models/user');

//add book
router.post('/createTransaction', (req, res, next) => {
  const userID = req.body.userID;
    let newTransaction = new Transaction({
      books: req.body.books,
      totalPrice: req.body.totalPrice
    });
  
    Transaction.addTransaction(newTransaction, (err, transaction) => {
      if (err) {
        res.json({ success: false, msg: 'Failed to create transaction' });
      }
      else {
        User.getUserById(userID, (err, user) => {
          if (err) throw err;
          if (!user) {
            return res.json({ success: false, msg: "User not found" })
          }
          else {
            User.addTransactionToUser(transaction, user, (err, transaction) => {
              if (err) {
                res.json({ success: false, msg: 'Failed to add transaction to user' });
              }
              else {
                res.json({ success: true, transaction: transaction, msg: 'Added transaction to user' });
              }
            });
          }
        });
      }
    });
  });
  
  module.exports = router;