const express = require('express');
const router = express.Router();
const passport =require('passport');
const authsvc = require('../access_auth');//JWT token
const userController = require('../controllers/user.controller');
var store = require('store');//https://www.npmjs.com/package/store

router.post('/register', userController.register);

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'No user',
                user   : user
            });
        }
        //http://www.passportjs.org/docs/login/
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = authsvc.createToken({user:user.username});
           user.password='';

           console.log(user.studentid)
           //window.localStorage.setItem('studentid', user.studentid)//server side doesn't have access to browser API
           //store.set('studentid', {studentid: user.studentid})//access stored id aft logging in to see if nurse or patient

           return res.json({user,token});
        });
    })(req, res);
});
module.exports = router;