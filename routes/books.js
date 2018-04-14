const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Book = require('../models/book');

//add book
router.post('/createBook', (req, res, next) => {
  let newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    stock: req.body.stock
  });

  Book.addBook(newBook, (err, book) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to create book' });
    }
    else {
      res.json({ success: true, msg: 'Book created and added' });
    }
  });
});

router.get('/bookList', (req, res) => {
  // Search database for all books
  Book.find({}, (err, books) => {
    // Check if error was found or not
    if (err) {
      res.json({ success: false, message: err }); // Return error message
    } else {
      // Check if any books were found in database
      if (!books) {
        res.json({ success: false, message: 'No books found.' }); // Return error if no books were found
      } else {
        res.json({ success: true, books: books }); // Return success and books array
      }
    }
  })
});

router.post('/getBookbyID', (req, res) => {
  const bookID = req.body.bookID;
  Book.getBookById(bookID, (err, book) => {
    if (err) throw err;
    if (!book) {
      return res.json({ success: false, msg: "Book not found" })
    }
    else {
      res.json({ success: true, book: book }); // Return success and corresponding book object
    }
  });
});

router.put('/updateGroup', (req, res, next) => {
  const bookID = req.body._id;
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const category = req.body.category;
  const image = req.body.image;
  const stock = req.body.stock;

  Book.findOneAndUpdate({ _id: bookID },
    {
      $set: {
        title: title,
        author: author,
        price: price,
        category: category,
        image: image,
        stock: stock
      }
    }, (err, newBook) => {
      if (err)
        res.json({ success: false, err: err, msg: 'Failed to update book' });
      else {
        res.json({ success: true, msg: 'Book Updated'});
      }
    }

  );
});


module.exports = router;
