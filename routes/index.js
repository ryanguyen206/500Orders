let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");

// start by creating data so we don't have to type it in each time
let ServerOrderArray = [];

// define a constructor to create movie objects
let OrderObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
  
    this.storeID = pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;  
    this.pricePaid = pPricePaid; 
    this.date = pDate; // action  comedy  drama  horrow scifi  musical  western
}

// my file management code, embedded in an object
fileManager  = {
  // this will read a file and put the data in our movie array
  // NOTE: both read and write files are synchonous, we really can't do anything
  // useful until they are done.  If they were async, we would have to use call backs.
  // functions really should take in the name of a file to be more generally useful
  read: function() {
    // has extra code to add 4 movies if and only if the file is empty                        
    var rawdata = fs.readFileSync('ordersData.json'); // read disk file
    ServerOrderArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
    },
   
  
  write: function() {
    let data = JSON.stringify(ServerOrderArray);    // take our object data and make it writeable
    fs.writeFileSync('ordersData.json', data);  // write it
  },
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all Movie data */
router.get('/getAllOrders', function(req, res) {
  fileManager.read();
  res.status(200).json(ServerOrderArray);
});


/* Add one new Movie */
router.post('/AddOrder', function(req, res) {
  const newOrder = req.body;  // get the object from the req object sent from browser
  console.log(newOrder);
  ServerOrderArray.push(newOrder);  // add it to our "DB"  (array)
  fileManager.write();
  // prepare a reply to the browser
  var response = {
    status  : 200,
    success : 'Added Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

// delete movie




module.exports = router;
