const express = require("express"); // imports expressjs
const path = require("path"); // deals with filepaths
const exphbs = require("express-handlebars"); // imports template engine called handlebars
const logger = require("./middleware/logger"); // our logger middleware which is exported from here.
// const moment = require('moment'); // Traversy imports moment to log the time in the console.
// moment is not imported here because it is neccesary to put it into the ./members/logger.js file
// for it to run.

const members = require("./members");

const app = express(); // common expression for referencing expressJS is the term 'app'

// app.get('/' (req, res) => { //sends a GET request that asks for the '/' HOME page, second parameter is a function that asks for request/response parameters
//  res.send('<h1>Hello World</h1>'); // in this c case upon response, we program that we want the user to see a header with 'Hello World' printed in it
//  res.sendFile(path.join(__dirname, 'public', 'index.html')); // here we see Traversy use the NodeJS native path module syntax to join the
//  __dirname directory, which is the dev's current directory, into a folder called 'public', and then looks for a file called 'index.html',
//  and then resolves that function, sending the file to the response parameter of the ExpressJS's app.get method.
//  })

// Body Parser middleware
// app.use(express.json()); // executes ExpressJS's json method, which very simply parses the output into JSON format
// app.use(express.urlencoded({ extended: false })); // allows for the handling of url encoded data.

// const members = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@gmail.com",
//     status: "active"
//   },
//   {
//     id: 2,
//     name: "Bob Williams",
//     email: "bob@gmail.com",
//     status: "inactive"
//   },
//   {
//     id: 3,
//     name: "Shannon Jackson",
//     email: "shannon@gmail.com",
//     status: "active"
//   }
// ];
//

//  Init middleware
// const logger = (req, res, next) => { // any middleware funciton utilized here will take in req, res, and next parameters
//  next() method will pass it to the ExpressJS app.use() in this case and any time a request is made to the server, in this case,
//  we console.log 'Hello'
//   console.log('Hello');
//   next();
// };
//app.use(logger);

// In this case though we...
// const logger = (req, res, next) => {
//  we console.log the request.protocol method, which returns 'http', we also then follow it by ":" then the request.get method which returns the 'host',
//  then we ask for what is returned bythe response.originalURL method, followed finally by the ":" and what is returned by the string literal of the moment.format() method
//  which should give us the current date/time
//   console.log(`${req.protocol}://${req.get('host')}${req.originalURL}: ${moment().format()}`);
//   next();
// };
//app.use(logger);

//  At this point, Traversy then installs moment from npm.
//  And after creating logger, he then copypastas it into a file called 'logger.js' and puts it into a directory called
//  middleware, from which he exports the contents, which are then imported here in index.js
//  This leaves us with just:

//  Init middleware
//  app.use(logger);

//  Gets All Members
// app.get('/api/members', (req, res) => {
//   res.json(memebers);
// });

//  Get Single Members
//  app.get('/api/members/:id', (req, res) => { // returns a single member by id
//    res.send(req.params.id); response.send method where we pass what is returned by the GET REQUEST, specifically the value returned by it's ID key
//    res.json(members.filter(member => member.id === parseInt(req.params.id)); //response.json method returns the members object with the specified ID number,
//  which is filtered by the specified ID number
//  notice the parseInt method is invoked in order to ensure that a number is returned.
//  });

//  Get Single Members
//  app.get('/api/members/:id', (req, res) => { // returns a single member by id
//    const found = members.some(member => member.id === parseInt(req.params.id)); //  Array.prototype.some method returns a Boolean value of true/false based on
//  the parameters passed.  In this case it goes over the array members, for each individual member item, it checks to see if the member.id value is equal to then
//  object's ID returned by our GET REQUEST ID, when parsed as an Integer, is the same number as the passed member.id.  If it is, then const found = 'true', else found = 'false'

//  if (found) {  //  so then we pass the Boolean value of what is returned by found, if found exists (in this case as 'true')
//    res.json(members.filter(member => member.id === parseInt(req.params.id));  //  the members array is then filtered based off of the same parameters as before.
//  } else {  //  and if found is 'false'...
//    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });  //  then an error 400 status is given, which indicates that no member with the id was found at
//    the specified ID number.
//    }
//  }






//Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" })); // sets the template engine to handlebars, and then references the handlebars extension that sets the defaultLayout to
// the name of 'main' which is found within the views/layouts folder
app.set("view engine", "handlebars"); // simply setting the view engine, these are default settings that for all intents and purposes don't have to be deeply understood...
// but perhaps should be investigated further
// note that templates like these are, according to Traversy, utilized mainly for the back end, whereas on the front end, APIs such as ReactJS or VueJS are used instead.


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
// app.get('/', (req, res) => res.render('index', {
//     title: 'Member App',
//     members
//   })
// });

// Homepage Route
  res.render("index", {
    title: "Members App",
    members: members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public"))); // ExpressJS app.use method sets a static folder from which our current directory, '__dirname',
// has a path set to a folder called 'public', in this case we put an 'about.html' file, a 'css' directory, and an 'index.html' file.
// All your html and css can be referenced in the "public" folder.

//Members API routes
app.use("/api/members", require("./routes/api/members")); // ExpressJS app.use will ROUTE all data from ./routes/api/members to be used when we call for
// data from /api/members.  Essentially allowing us, the dev, to shorten the syntax on our above GET REQUESTS to / instead of /api/members



const PORT = process.env.PORT || 5000; // To be used in conjunction with Express's .listen method
// note that it invokes a process.env.PORT which connects to a server .. OR it connects to our localhost port 5000.

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));// console.logs the PORT used.
