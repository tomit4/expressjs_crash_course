// very essentially, we import express, we GET a url and on RESOLUTION
// we perform a method, in this case 'send', a REQUEST series of methods are available
// as well.

const express = require("express"); //import ExpressJS

// Init express
const app = express(); //common to call express 'app'

// Create your endpoints/route handlers
app.get("/", function(req, res) {
  //app.get GETS the "/" address and passes a common request/response parameters
  //
  res.send("Hello World"); //obviously sending the string 'Hello World' back to the user.
});

//Listen on a port
app.listen(5000); //as Traversy points out, just listen on port 5000.

// Basic Route Handeling

app.get("/", function(req, res) {
  // Fetch from database
  // Load pages
  // Return JSON
  // Full access to request & response
});
