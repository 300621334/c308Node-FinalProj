var express = require('express');
var router = express.Router();
var store = require('store');//https://www.npmjs.com/package/store

router.get('/', function(req, res, next){
    console.log('In index.js: ' + req.query.studentid)
    store.set('studentid', {studentid:req.query.studentid})
    //req.studentid = req.query.studentid;
    res.render('index.html');
});

module.exports = router;