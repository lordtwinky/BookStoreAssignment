const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const ShoppingCart = require('../models/shoppingCart');
const User = require('../models/user');

//add book to shopping cart of user
router.post('/addBookToShoppingCart', (req, res, next) => {
    const userID = req.body.userID
    const bookID = req.body.bookID

    User.getUserById(userID, (err, user) => {
        if (err) throw err;
        if (!user) {
          return res.json({ success: false, msg: "User not found" })
        }
        else {
            ShoppingCart.getShoppingCartById(user.shoppingCart, (err, shoppingCart) => {
                if (err) throw err;
                if (!shoppingCart) {
                  return res.json({ success: false, msg: "Shopping Cart not found" })
                }
                else {
                    Book.getBookById(bookID, (err, book) => {
                        if (err) throw err;
                        if (!book) {
                          return res.json({ success: false, msg: "Book not found" })
                        }
                        else {
                              ShoppingCart.addBookToShoppingCart(book, shoppingCart, (err, book) => {
                                if (err) {
                                  res.json({ success: false, msg: 'Failed to add book to shopping cart' });
                                }
                                else {
                                  res.json({ success: true, book: book, msg: 'Added book to shopping cart' });
                                }
                              });
                        }
                      });
                }
              });
        }
      });
});

router.post('/getShoppingCartbyID', (req, res, next) => {
    const shoppingCartID = req.body.shoppingCartID

    ShoppingCart.getShoppingCartById(shoppingCartID, (err, shoppingCart) => {
        if (err) throw err;
        if (!shoppingCart) {
          return res.json({ success: false, msg: "Shopping Cart not found" })
        }
        else {
          res.json({ success: true, shoppingCart: shoppingCart }); // Return success and corresponding shoppingCart object
        }
      });

});

router.put('/updateShoppingCartDelete', (req, res, next) => {
  const shoppingCartID = req.body.shoppingCartID;
  const bookID = req.body.bookID;
  ShoppingCart.getShoppingCartById(shoppingCartID, (err, shoppingCart) => {

      ShoppingCart.findOneAndUpdate({ _id: shoppingCartID }, { $pull: { books: { $in: [bookID] } } }, function (err, deleteShoppingCart) {
        if (err)
          throw err;
        if (!deleteShoppingCart) {
          return res.json({ success: false, msg: 'ShoppingCart with id ' + shoppingCartID + ' not found' })
        }
        else {
          return res.json({ success: true, msg: 'Book deleted successfully from shopping cart' })
        }
      });

  });

});

router.put('/ShoppingCartPurchase', (req, res, next) => {
  const shoppingCartID = req.body.shoppingCartID;
  ShoppingCart.getShoppingCartById(shoppingCartID, (err, shoppingCart) => {

      ShoppingCart.findOneAndUpdate({ _id: shoppingCartID }, { $set: { books: [] } }, function (err, deleteShoppingCart) {
        if (err)
          throw err;
        if (!deleteShoppingCart) {
          return res.json({ success: false, msg: 'ShoppingCart with id ' + shoppingCartID + ' not found' })
        }
        else {
          return res.json({ success: true, msg: 'Books deleted successfully from shopping cart' })
        }
      });

  });

});

module.exports = router;
