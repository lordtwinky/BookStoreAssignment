const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Review = require('../models/review');
const User = require('../models/user');

//add review
router.post('/addReview', (req, res, next) => {
  const bookID = req.body.bookID
  const userID = req.body.userID

  User.getUserById(userID, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" })
    }
    else {
      let newReview = new Review({
        starRating: req.body.starRating,
        comment: req.body.comment,
        user: user
      });
      Review.addReview(newReview, (err, review) => {
        if (err) {
          res.json({ success: false, msg: 'Failed to create review' });
        }
        else {
          Book.getBookById(bookID, (err, book) => {
            if (err) throw err;
            if (!book) {
              return res.json({ success: false, msg: "Book not found" })
            }
            else {
              Book.addReviewToBook(newReview, book, (err, review) => {
                if (err) {
                  res.json({ success: false, msg: 'Failed to add review to book' });
                }
                else {
                  res.json({ success: true, review: newReview, msg: 'Review created and added' });
                }
              });
            }
          });
        }
      });
    }
  });

});

router.post('/getReviewbyID', (req, res) => {
  const reviewID = req.body.reviewID;
  Review.getReviewById(reviewID, (err, review) => {
    if (err) throw err;
    if (!review) {
      return res.json({ success: false, msg: "Review not found" })
    }
    else {
      res.json({ success: true, review: review }); // Return success and corresponding review object
    }
  });
});




module.exports = router;
