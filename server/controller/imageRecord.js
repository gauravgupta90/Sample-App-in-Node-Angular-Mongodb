'use strict';

var ImageRecord = require('../model/imageRecord').ImageRecord,
    Boom = require('boom');

/**
   GET: /post
 */

exports.getAll = function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    ImageRecord.getAllImage(function(err, result) {
      if (!err) {
          return res.json(result);
      } else {
          return res.send(Boom.badImplementation(err)); // 500 error
      }
    });
};

exports.makeImageEntry = function(name, callback){
	var data = {
		'name' : name 
	}
	ImageRecord.createImage(data, callback);
}


