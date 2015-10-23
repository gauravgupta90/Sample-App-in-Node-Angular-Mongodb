'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ImageRecordSchema = new Schema({

	/** 
    	Image Name ex: About.jpg. It can contain string, is required.
  	*/
	name : { type: String, required: true, unique: true },
});

ImageRecordSchema.statics.getAllImage= function(callback) {
    this.find({}, callback);
};

ImageRecordSchema.statics.createImage = function(requestData, callback) {
    this.create(requestData, callback);
};

var imageRecord = mongoose.model('imageRecord', ImageRecordSchema);

/** export schema */
module.exports = {
    ImageRecord : imageRecord
};