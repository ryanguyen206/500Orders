let x = 2;
var express = require('express');
var router = express.Router();

//mongoose
var mongoose = require("mongoose");
const OrderSchema = require('../orderSchema');




const uri = "mongodb+srv://ryanuser:ryanuser@shoecluster.mfppdrw.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);
  

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

// // my file management code, embedded in an object
// fileManager  = {
//   // this will read a file and put the data in our movie array
//   // NOTE: both read and write files are synchonous, we really can't do anything
//   // useful until they are done.  If they were async, we would have to use call backs.
//   // functions really should take in the name of a file to be more generally useful
//   read: function() {
//     // has extra code to add 4 movies if and only if the file is empty                        
//     var rawdata = fs.readFileSync('ordersData.json'); // read disk file
//     ServerOrderArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
//     },
   
  
//   write: function() {
//     let data = JSON.stringify(ServerOrderArray);    // take our object data and make it writeable
//     fs.writeFileSync('ordersData.json', data);  // write it
//   },
// }


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all Movie data */
router.get('/getAllOrders', function(req, res) {
  OrderSchema.find({}, (err, allOrders) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(allOrders);
  });
});


/* Add one new Movie */
router.post('/AddOrder', function(req, res) {

  let newOrder = new OrderSchema(req.body);  // get the object from the req object sent from browser
  newOrder.save(function(err,result){
      if (err) {
        res.status(500).send(err);
      }
      else {
      // console.log(todo);
      // res.status(201).json(todo);
  
      var response = {
        status  : 200,
        success : 'Added Successfully'
      }
      res.end(JSON.stringify(response)); // send reply
  
      }
    });
  });
  

router.get('/getAllWhoSold', function(req,res) {

  OrderSchema.aggregate([

    {$group: {_id:"$salesPersonID", total:{$sum: "$pricePaid"}}},
    {$sort: {total: -1}}
  
  ]).exec(function(err, results) {
    if (err) {
      console.log(err)
    }
    res.status(200).json(results)
  })

})

router.get('/sortSalesByStoreID/:STOREID', function(req,res) {
  let storeSwag = req.params.STOREID;
  
  OrderSchema.aggregate([

    {$match: {storeID : parseInt(storeSwag)}},

    {$sort: {total: -1}}



  ]).exec(function(err, results) {
    if(err) {
      console.log(err)
    }
    res.status(200).json(results)
  })
})




module.exports = router;
