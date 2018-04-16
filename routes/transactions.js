const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Transaction = require('../models/transaction');
const User = require('../models/user');

//add transaction
router.post('/createTransaction', (req, res, next) => {
  const userID = req.body.userID;
    let newTransaction = new Transaction({
      books: req.body.books,
      totalPrice: req.body.totalPrice,
      shippingAddress: req.body.shippingAddress,
      cardNumber: req.body.cardNumber
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

  router.post('/getTransactionByID', (req, res) => {
    const transactionID = req.body.transactionID;
    Transaction.getTransactionById(transactionID, (err, transaction) => {
      if (err) throw err;
      if (!transaction) {
        return res.json({ success: false, msg: "Transaction not found" })
      }
      else {
        res.json({ success: true, transaction: transaction }); // Return success and corresponding book object
      }
    });
  });
  
  module.exports = router;