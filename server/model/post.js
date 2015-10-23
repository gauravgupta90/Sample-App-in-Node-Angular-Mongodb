'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db;


autoIncrement.initialize(db);

/**
  * @module  Post
  * @description contain the details of post
*/

var PostSchema = new Schema({

  refId: { type: Number, required: true },
  
  /** 
    Car model ex: WagonR. It can contain string, is required.
  */
  model : { type: String, required: true },

  /** 
    Car maker ex: Maruti. It can contain string, is required field and indexed.
  */
  maker : { type: String, required: true, index: true },

  /** 
    Manufacturing year ex. "2010" It can contain string, is required field and indexed.
  */

  year : { type: String, required: true , index: true },

  /** 
    Image path. It can contain string.
  */

  image : { type: String },


  price:{
      
      sellingPrice:{ type: Number, index: true },

      currency: { type: String }
  }
  
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }    //seting toJSON option on the schema, so that virtual works when it return json data

});

PostSchema.plugin(autoIncrement.plugin, {
    model: 'post',
    field: 'refId'
});

PostSchema.virtual('listingPrice').get(function() {
    if(this.price.sellingPrice && this.price.currency)
        return this.price.sellingPrice + " " + this.price.currency;
    else undefined;
});


// will validate price.

PostSchema.path('price.sellingPrice').validate(function (v) {
    if(v){
      if(this.price.currency)
        return true;
      else return false;
    }
    else return true;
});

PostSchema.path('price.currency').validate(function (v) {
    if(v){
      if(this.price.sellingPrice)
        return true;
      else return false;
    }
    else return true;
});


PostSchema.statics.getAllPost= function(callback) {
    this.find({}, callback);
};

PostSchema.statics.getPost= function(querry, callback) {
    this.find(querry, callback);
};

PostSchema.statics.createPost = function(requestData, callback) {
    this.create(requestData, callback);
};

PostSchema.statics.updatePost = function(id, updateData, callback) {
    this.findOneAndUpdate({'_id': id}, { $set: updateData}, callback);
};

PostSchema.statics.removePost = function(id, callback) {
    this.remove({'_id': id}, callback);
};

var post = mongoose.model('post', PostSchema);

/** export schema */
module.exports = {
    Post : post
};