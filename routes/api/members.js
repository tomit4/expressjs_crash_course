const express = require("express"); // imports express
const router = express.Router(); // imports express Router method
const uuid = require("uuid"); // npm module that generates a uuid, you won't really need this in an actual application
const members = require("../../members"); //searches two directory levels up (express_crash_course) for the members.js file and imports it
// STOP AT 1:02, ALMOST DONE
// Gets All Members
router.get("/members", (req, res) => res.json(members));  //  Note that router.get replaces app.get when we import ExpressJS's Router method
// this will return all of our members in a JSON format

//Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

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


//Create Members
router.post("/", (req, res) => { //POST request that posts from our current directory, which in this case would reference ./routes/api/members
  // note that this would not be the same directory referenced above where we Get Single Member.  This is due to the GET REQUEST referencing
  // a different / directory..not exactly sure why this works.
  const newMember = {  // create a newMember object
    id: uuid.v4(), // in real programs, you wouldn't need this as most databases create a uuid for you.
    name: req.body.name, // note the REQUEST syntax here, the newMember object's name property is set to have the value of the REQUESTED name.
    email: req.body.email, // same for the email
    status: "active" // and the status is set to the string "active"
  };

  if (!newMember.name || !newMember.email) { // if the newMember's name or email values return false (i.e. they don't exist) ...
    return res.status(400).json({ msg: "Please inlclude a name and email" }); // respond with a 400 error message that asks for the user to input the data
  }

  // members.save(newMember);
  members.push(newMember); // push the newMember into the members array.
  res.json(members); // and respond with the JSON format of the members array.
  // res.redirect("/"); // would redirect us back to our homepage after the user submits changes
});

// Update Member
router.put("/:id", (req, res) => { // PUT REQUESTS are generally for updating the server
  const found = members.some(member => member.id === parseInt(req.params.id)); //once again, we create a variable that uses the Array.Prototype.some method to
  // return a Boolean value that is true when certain parameters are met. In this case if an ID number can be found, then it returns 'true', else it returns 'false'

  if (found) { // if found exists..
    const updMember = req.body; // create a variable called updMember (i.e. updateMember) and set it equal to the REQUESTED body value
    members.forEach(member => { // run a forEach loop on the member object...
      if (member.id === parseInt(req.params.id)) { // and if the member.id value is equal to the requested idnumber
        member.name = updMember.name ? updMember.name : member.name; // change the member name to the updated member name IF the updated member name exists, otherwise leave it unchanged.
        member.email = updMember.email ? updMember.email : member.email; //  same with the updated member email

        res.json({ msg: "Member updated", member }); // respond with a JSON object that has a msg key with the string 'Member updated' assigned to it, followed by the member object.
      }
    });
  } else { // otherwise...
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` }); // display a 400 error message with a message that No member with the given ID number was found.
  }
});

// Delete Members
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id)); //  Once again, uses Array.Prototype.some method to return a true or false value.

  if (found) { // if a true value is returned...
    res.json({ // respond with a JSON format
      msg: "Member deleted", // a message that the specified member was deleted...
      members: members.filter(member => member.id !== parseInt(req.params.id)) // and uses the filter method to return everything BUT the specified member.
    });
  } else { // otherwise a familiar error message is displayed
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router; // exports express's Router method.
