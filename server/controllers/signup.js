const User = require("../models/users")
const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'clipher';
const bcrypt=require("bcryptjs")


const signup= async (req, res) => {
    const { username, password, email,mobile } = req.body;
   
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // const user1 = User.find({email:email})
    // console.log(user1);
    // if(user1.length!=0) res.status(400).json("Email already exists")
    // else{
      const user = new User({ 
        username,
        password: hashedPassword, 
        email,
        about:"",
        mobile,
        links:{Linkedin:"",Github:"",Facebook:"",Website:""},
        profinf:{highed:"",currpos:""},
        interests:[]});
try {

await user.save();
// Create JWT token
const token = jwt.sign({ id: user._id }, JWT_SECRET);
res.json({ token,email,username });
} catch (err) {
console.log(err);
res.status(500).json('Error signing up');
}

    }
    
    
  // };

  module.exports=signup;