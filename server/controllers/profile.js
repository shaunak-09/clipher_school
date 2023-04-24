const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt=require("bcryptjs")
const CryptoJS=require("crypto-js")

module.exports.getprofile= async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if(!user) return res.status(403).json({error:"Invalid user"})
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports.updateprofile=async (req, res) => {
  try {
  
    const user = await User.findById(req.id);
    if(!user) return res.status(403).json({error:"Invalid user"})
    // console.log(user);

    if (req.body.name != null) {
      user.username = req.body.name;
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }
    if(req.body.about !=null){
        user.about=req.body.about
    }
  
    if(req.body.links.Linkedin !=null){
        user.links[0].Linkedin=req.body.links.Linkedin
    }
    if(req.body.links.Github !=null){
        user.links[0].Github=req.body.links.Github
    }
    if(req.body.links.Facebook !=null){
        user.links[0].Facebook=req.body.links.Facebook
    }
    if(req.body.links.Website !=null){
        user.links[0].Website=req.body.links.Website
    }
    if(req.body.profinf.highed !=null){
      user.profinf[0].highed=req.body.profinf.highed
  }
  if(req.body.profinf.currpos !=null){
    user.profinf[0].currpos=req.body.profinf.currpos
}

    if (req.body.password != null) {
      const secretPass="Clipherschool"
    
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(req.body.password),
        secretPass
      ).toString();
      user.password =data
    
    }
    console.log();
    if(req.body.interests !=null){
      //  req.body.interests.map((item)=>
      //   user.interests.push(item))
      user.interests=req.body.interests
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};








