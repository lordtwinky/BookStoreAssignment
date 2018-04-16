const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const ShoppingCart = require('../models/shoppingCart');

//Register
router.post('/register', (req, res, next) => {
    let newShoppingCart = new ShoppingCart({
    });

    ShoppingCart.addShoppingCart(newShoppingCart, (err, shoppingCart) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        }
        else {
            let newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                shoppingCart: shoppingCart,
                admin: req.body.admin
            });
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to register user' });
                }
                else {
                    res.json({ success: true, msg: 'User registered' });
                }
            });
        }
    });



});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 //1 week of seconds
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                return res.json({ success: false, msg: "Wrong Password" });
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

router.get('/userList', (req, res) => {
    // Search database for all users
    User.find({}, (err, users) => {
        // Check if error was found or not
        if (err) {
            res.json({ success: false, message: err }); // Return error message
        } else {
            // Check if any users were found in database
            if (!users) {
                res.json({ success: false, message: 'No users found.' }); // Return error if no users were found
            } else {
                res.json({ success: true, users: users }); // Return success and users array
            }
        }
    })
});

router.post('/getUserbyID', (req, res) => {
    const userID = req.body.userID;
    User.getUserById(userID, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: "User not found" })
      }
      else {
        res.json({ success: true, user: user }); // Return success and corresponding user object
      }
    });
  });


module.exports = router;
