var express = require('express');
var router = express.Router();
let courseModel=require('../model/course.model')
var store = require('store');//https://www.npmjs.com/package/store

//Get All Task
router.get('/tasks', function(req, res, next){
    console.log('In tasks.js: ' + store.get('studentid').studentid)
    var studentid = store.get('studentid').studentid + '';//unique ID of loggedin user
    var isPatient = studentid.charAt(0) !== '9';//Nurses' IDs start w 9
    if(!isPatient)
    {
         courseModel.find(function(err,course){
        if(err){
            res.send(err);
        }
        res.json({course:course});   
        });
    }
    else//records for this patient ONLY
    {
        courseModel.find({title:studentid}, function(err,course){
            if(err){
                res.send(err);
            }
            res.json({course:course , userId: studentid});   
            });
    }
   
});
//Get single Task
router.get('/task/:id', function(req, res, next){
    courseModel.findById(req.params.id, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/tasks', function(req, res, next){
    var task = req.body;
    if(!task.title || !task.isbn ||!task.author){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {

        //https://mongoosejs.com/docs/models.html#constructing-documents
        courseModel.create(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    courseModel.findByIdAndRemove(req.params.id, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
// Update Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    
    if(task.coursecode){
        updTask.coursecode = task.coursecode;
    }
    
    if(task.coursename){
        updTask.coursename = task.coursename;
    }
    
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        courseModel.findByIdAndUpdate({_id: req.params.id}, req.body, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});
module.exports = router;