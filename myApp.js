
var express = require('express');
var app = express();

const respFiveObj = {"message": "Hello json"};
process.env.MESSAGE_STYLE='uppercase';

// --> 7)  Mount the Logger middleware here
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server 
app.get('/', function(req, res) {
  res.send('Hello Express');
});*/

/** 3) Serve an HTML file */
app.get('/', function(req, res) {
  let absPath = __dirname + "/views/index.html"
  res.sendFile(absPath);
});

/** 4) Serve static assets  */
let absPath = __dirname + "/public"
app.use(express.static(absPath)) 

/** 5) serve JSON on a specific route 
app.get('/json', function(req, res) {
  res.json(respFiveObj);
});*/

/** 6) Use the .env file to configure the app */
app.get('/json', function(req, res) {
  if(process.env.MESSAGE_STYLE === 'uppercase') {
    console.log(process.env.MESSAGE_STYLE);
    let str = respFiveObj.message;
    respFiveObj.message = str.toUpperCase();
    //console.log(str);
  }
  res.json(respFiveObj);
});
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  console.log("Chaining middleware");
  req.time = new Date().toString();
  next();
}, function(req, res) {
  const timeObj = {"time": req.time};
  console.log(req.time);
  res.send(timeObj);
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res) {
  const echoObj = {"echo": req.params.word};
  res.send(echoObj);
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
