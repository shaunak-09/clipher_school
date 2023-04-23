const express=require("express")
const router=express.Router()
const login=require("./controllers/login")
const signup=require("./controllers/signup")
const profile=require("./controllers/profile.js")
const auth=require("./middleware/auth.js")


router.post("/login/",login)
router.post("/signup/",signup)
router.get("/profile/",auth,profile.getprofile)
router.post("/profile/",auth,profile.updateprofile)

module.exports=router