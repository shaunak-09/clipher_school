const User = require("../models/users")
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = 'clipher';
const bcrypt=require("bcryptjs")



 const login= async (req,res) => {
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid username or password');
   
    if (await bcrypt.compare(password, user.password)) {
     
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({ token,username:user.username,email});
    } else {
      res.status(400).send('Invalid username or password');
    }
  };

  module.exports=login