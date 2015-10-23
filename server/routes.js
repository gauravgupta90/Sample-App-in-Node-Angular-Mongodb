'use strict';

// Load modules

var Post      = require('./controller/post'),
    Static    = require('./static'),
    ImageRecord = require('./controller/imageRecord'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();


// API Server Endpoints
module.exports = function(app){

	app.route('/post')
	  .post(Post.create)
    .get(Post.getAll)
    .put(Post.searchPost);

  app.route('/getImage/:image')
    .get(Post.getImage);

  app.route('/uploadFile')
  	.post(multipartMiddleware, Post.uploadFile)
  	.get(Post.display_form);

  app.route('/image')
    .get(ImageRecord.getAll);

}
