var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var passport = require('passport')
var LocalStrategy = require('passport-local');


// keep user information in the login session
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

// verify if user exists and if password is correct
passport.use(new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
    let filteredArray = usersArray.filter(x => x.username === username);
    if (filteredArray.length > 0) {
        let usersData = filteredArray[0];
        if (usersData.password == password) {
            return cb(null, usersData);
        }
    }
    else {
        return cb(null, false);
    }
}));

// POST request
router.post('/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/memesOverview',
    failureRedirect: '/login'
}));

// end current session by logout
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
            res.redirect('/login');
    });
});


// GET request
router.get('/', function(req, res, next) {
    if(!req.user) {
        res.render('login', {user: null});
    }
    else {
        res.render('login', {user: req.user});
    }
});

module.exports = router;