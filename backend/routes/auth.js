const express = require('express');
const User = require('../models/User');
const router = express.Router();
const fetchuser= require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
var jwt = require('jsonwebtoken');

router.post('/api/auth/createuser', [body('name').isLength({ min: 3 }).isAlpha(), body('email').isEmail(), body('password').isLength({ min: 5, max: 13 })], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
// check weather the user with email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" });
    } 
    // encryption with salt
    const salt =await bcrypt.genSalt(10);
    const secPassword=await bcrypt.hash(req.body.password,salt);
    // create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    })
    data={
      user:{
        id:user.id
      }
    }
    const authToken= jwt.sign(data,"kapilHappy");
    res.json({authToken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});
router.post('/api/auth/login', [body('email',"Enter a valid email ").exists(), body('password',"Enter a valid password").isLength({ min: 5, max: 13 })], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}= req.body;
  try {
    let user= await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Please enter right credential!"});
    }
    const compassword= await bcrypt.compare(password,user.password);
    if(!compassword){
      return res.status(400).json({error:"Please enter right credential!"});
    }
    data={
      user:{
        id:user.id
      }
    }
    const authToken= jwt.sign(data,"kapilHappy");
    res.json({authToken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
}
);

//route 3 get login user info
router.get('/api/getuser',fetchuser, async (req, res) => {
    try {
      userId =req.user.id;
      const user =await User.findById(userId).select('-password');
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An error occurred");
    }
});

module.exports = router