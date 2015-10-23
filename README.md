Sample Application for Express.js, Mongodb, Angular, Node.js
=============================================================

The purpose of this app is to prepare a basic Skeleton for a node.js project and show a new way to work with Express.js, Mongodb, Mongoose, Angular.js.

This gives a quick start for a node.js industrial project without worrying much on structure but focus more on business logic.

It has only basic modules to start a new project from scratch and later add few advance module when needed.

Now it's time to start coding...

Happy Coding!


### Install an app

Run the following command in root directory of an app in command prompt.

###### *Install node packages*

server/ npm install

###### *Install bower components*

client/src/ bower install

### Run an app

###### *Run Server*

Run the following command in root directory of an app in command prompt.

server/ node server.js

You can see the port number in command prompt after sucessfull run

You can change the settings in server/config/config.js file

### API

###### *GET request/ get all posts*

    http://localhost:8000/post

###### *POST request/ Create post*

    http://localhost:8000/post
    
    Body:

     	{
    		"model": "WaganoR",
    		"maker": "maruti",
    		"year": "2010",
    		"image": "hgfgh.jpg",
    		"price": {
        		"sellingPrice": 8000,
        		"currency": "INR"
    		}
	}

	Response:

    	{
    		"_id": "562637d2a35f447e0583e4f8",
    		"refId": 2,
    		"model": "WaganoR",
    		"maker": "maruti",
    		"year": "2010",
    		"image": "hgfgh.jpg",
		"price": {
		        "sellingPrice": 8000,
		        "currency": "INR"
		},
    		"listingPrice": "8000 INR"
	}


###### *GET request/ Get Image*

    http://localhost:8000/getImage/About.jpg


###### *GET request/ Get upload form*

    http://localhost:8000/uploadFile

    On successfull upload you will get uploaded image file name.

###### *PUT request/ Search post*

    http://localhost:8000/post

    Body:

        {
            "model": "WaganoR",
            "maker": "maruti",
            "year": "2010"
        }






		
