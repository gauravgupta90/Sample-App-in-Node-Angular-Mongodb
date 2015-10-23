'use strict';

var Post = require('../model/post').Post,
    ImageRecord = require('./imageRecord'),
    fs = require('fs'),
    path = require('path'),
    Boom = require('boom');



/**
   GET: /post
 */

exports.getAll = function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    Post.getAllPost(function(err, post) {
      if (!err) {
          res.json(post);
      } else {
          res.send(Boom.badImplementation(err)); // 500 error
      }
    });
};

/**
   PUT: /post
 */

exports.searchPost = function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    var query = {};
    for(var obj in req.body){
      if(req.body[obj] == '') continue;
          if(obj == 'year')
            query[obj] = req.body[obj];
          else
            query[obj] = new RegExp(req.body[obj], "i");
    }
    console.log(query);
    Post.getPost(query, function(err, post) {
      if (!err) {
          res.json(post);
      } else {
          res.send(Boom.badImplementation(err)); // 500 error
      }
    });
};

/**
   GET: /uploadFile
 */


exports.getImage = function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'image/jpeg');
    var file_id = req.params.image;
    var file_path =  __dirname+'/../Utility/Image/';
    var file = file_path+file_id;
    res.sendfile(path.resolve(file));
}


/**
   POST: /post
 */

exports.create = function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    Post.createPost(req.body, function(err, data) {
        if (!err) {
            res.json(data);
        } else {
             if (11000 === err.code || 11001 === err.code) {
                    return res.json("duplicate, it already exist").status(403);
            }
            else return res.json(err).status(403); // HTTP 403
        }
    });
};

/*
 * GET: /uploadFile
 */

exports.display_form = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write(
        '<h2>Upload Image</h2>'+
        '<form action="/uploadFile" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="file">' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
    res.end();
};

/*
 * POST: /uploadFile
 */

exports.uploadFile = function(req, res) {    
    res.header("Access-Control-Allow-Origin", "*");
    var tmp_path = req.files.file.path;
    ImageRecord.makeImageEntry(req.files.file.name, function(err, result){
      if(err){
        console.log("File with name already exit");
        return res.json("File with name already exit").status(403);
      }
      else{
        checkFileExist(function(){
            var target_path = __dirname+'/../Utility/Image/' + req.files.file.name;
            var is = fs.createReadStream(tmp_path);
            var os = fs.createWriteStream(target_path);
            is.pipe(os);
            is.on('end', function() {
                fs.unlinkSync(tmp_path);
            });
            res.send(req.files.file.name);
        });
      }
    });    
};

/*
 * Check File existence and create if not exist
 */

var checkFileExist = function(callback) {
    fs.exists(__dirname+'/../Utility', function(exists) {
        if (exists === false) fs.mkdirSync(__dirname+'/../Utility');

        fs.exists(__dirname+'/../Utility/Image/', function(exists) {
            if (exists === false) fs.mkdirSync(__dirname+'/../Utility/Image/');
            callback();
        });
    });
};
