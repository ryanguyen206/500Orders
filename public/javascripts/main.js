
let orderArray = [];

let storeIDArray = [98053, 98007, 98077, 98055, 98011, 98046]

let cdIDArray = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623541]

let pricePaidArray = [1,2,3,4,5,6,7,8,9]

let salesPersonOne = [1,2,3,4]
let salesPersonTwo = [5,6,7,8]
let salesPersonThree = [9,10,11,12]
let salesPersonFour = [13,14,15,16]
let salesPersonFive = [17,18,19,20]
let salesPersonSix = [21,22,23,24]
// define a constructor to create movie objects
let OrderObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
  
    this.storeID = pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;  
    this.pricePaid = pPricePaid; 
    this.date = pDate; 
}

let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function () {

 

// add button events ************************************************************************
    document.getElementById("dummyButtonAdd").addEventListener("click", function() {
        let storeID = storeIDArray[Math.floor(Math.random() * storeIDArray.length)];
        let salesID = determineSalesID(storeID);
        let cdID = cdIDArray[Math.floor(Math.random() * cdIDArray.length)];
        let pricePaid = pricePaidArray[Math.floor(Math.random() * pricePaidArray.length)];
        
        var t = new Date();
        t.setSeconds(t.getSeconds() + Math.floor(Math.random() * 30));


        console.log(storeID, salesID, cdID, pricePaid, t)
        
        
    })
//button one - 
    document.getElementById("buttonAdd").addEventListener("click", function () {
        
        orderArray = [];

        for (let i=0; i<500; i++) {
           let storeID = storeIDArray[Math.floor(Math.random() * storeIDArray.length)];
        let salesID = determineSalesID(storeID);
        let cdID = cdIDArray[Math.floor(Math.random() * cdIDArray.length)];
        let pricePaid = pricePaidArray[Math.floor(Math.random() * pricePaidArray.length)];
        
        var t = new Date();
        t.setSeconds(t.getSeconds() + Math.floor(Math.random() * 30));
            
            let newOrder = new OrderObject(storeID, salesID, cdID, pricePaid, t)
    
            fetch('/AddOrder', {
                method: "POST",
                body: JSON.stringify(newOrder),
                headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json),
                )
                .catch(err => console.log(err));
        }
       createList();
    });

  

    

    $(document).bind("change", "#select-genre", function (event, ui) {
        selectedGenre = $('#select-genre').val();
    });

  

});  
// end of wait until document has loaded event  *************************************************************************

function determineSalesID(storeID) {
    let salesID = 0;
    let length = salesPersonFive.length;
    98053, 98007, 98077, 98055, 98011, 98046
    switch(storeID) {
        case 98053:
          salesID = salesPersonOne[Math.floor(Math.random() * length)];
          break;
        case 98007:
            salesID = salesPersonTwo[Math.floor(Math.random() * length)];
          break;
        case 98077:
            salesID = salesPersonThree[Math.floor(Math.random() * length)];
          break;
        case 98055:
            salesID = salesPersonFour[Math.floor(Math.random() * length)];
            break;
        case 98011:
            salesID = salesPersonFive[Math.floor(Math.random() * length)];
                // code block
                break;
        case 98046:
            salesID = salesPersonSix[Math.floor(Math.random() * length)];
            // code block
            break;
        default:
          return 0;
      }

      return salesID;
}

function createList() {
// update local array from server

    fetch('/getAllOrders')
    // Handle success
    .then(response => response.json())  // get the data out of the response object
    .then( responseData => fillUL(responseData))    //update our array and li's
    .catch(err => console.log('Request Failed', err)); // Catch errors

    $.get("/getAllOrders", function(data, status){  // AJAX get
        orderArray = data;  // put the returned server json data into our local array
        
          // clear prior data
        var divMovieList = document.getElementById("divMovieList");
        while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
            divMovieList.removeChild(divMovieList.firstChild);
        };

        var ul = document.createElement('ul');

        orderArray.forEach(function (element,) {   // use handy array forEach method
            var li = document.createElement('li');
            li.innerHTML = element.storeID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
            element.salesPersonID + "  &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp "  
            + element.cdID + " &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  " + element.pricePaid 
            + " &nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp " + element.date;
            ul.appendChild(li);
        });
        divMovieList.appendChild(ul)

    });
};



function fillUL(data) {
        // clear prior data
    var divMovieList = document.getElementById("divMovieList");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };

    var ul = document.createElement('ul');
    orderArray = data;
    orderArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.storeID + " &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp " + 
        element.salesPersonID + "  &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp "  
        + element.cdID + " &nbsp &nbsp  &nbsp &nbsp  " + element.pricePaid 
        + " &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp  " + element.date;
        ul.appendChild(li);
    });
    divMovieList.appendChild(ul)
}



   



  
