var Users = require("../models/UserModel");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");


module.exports.setRoutes = function(app) {
  //Create the Task
 

  //Get the Task
  app.post('/register', (req, res) => {
 
    Users.findOne({ email: req.body.email }).then(user => {
      if (user) {
       
        return res.status(400).json({err: 'User is already registered'});
      } else {
        
  
        const newUser = new Users({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          console.log("salt"+salt);
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

 // Login API WHICH WILL PASS TOKEN FROM BACKEND TO FRONTEND
  app.post('/login', (req, res) => {
   
  
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    Users.findOne({ email:email }).then(user => {
      // Check for user
      if (!user) {
       
        return res.status(404).json({err:"User not found"});
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
  console.log(payload);
          // Sign Token
          jwt.sign(
            payload,
            "secret",
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
         
          return res.status(400).json("Password did not match");
        }
      });
    });
  });


};
