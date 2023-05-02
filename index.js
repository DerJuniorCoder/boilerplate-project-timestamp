// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Get route parameter input from the client
app.get("/api/:date", (req,res) => {
  const date = req.params.date;
  const regex = new RegExp('[a-zA-Z-]');
  const regex2 = new RegExp('[0-9]');
  console.log("date: " + date);

  if (regex.test(date)) {
    //input has letters or dashes
    const unixTimeStamp = new Date(date).getTime();
    const utc = new Date(date);
    console.log("unixTimeStamp: " + unixTimeStamp);
    console.log("isNan: " + isNaN(unixTimeStamp));

    if (!isNaN(unixTimeStamp)) {
      //input is valid
      res.json({
        unix: unixTimeStamp,
        utc: utc.toUTCString()
      });
    } else {
      //input is invalid
      res.json({error : "Invalid Date"});
    }
  } else if (regex2.test(date)){
    //input has only numbers
    const dateNumber = parseInt(date);
    const utc = new Date(dateNumber);
    res.json({
      unix: dateNumber,
      utc: utc.toUTCString()
    });
  }
  
  // date.toUTCString();
});

//if date input is empy
app.get("/api/", (req, res) => {
  const date = new Date();
  const unixTimeStamp = new Date(date).getTime();
  res.json({
    unix: unixTimeStamp,
    utc: date
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
