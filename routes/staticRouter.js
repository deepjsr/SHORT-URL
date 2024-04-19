const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get('/', async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render("HomePage",{
        urls:allUrls,
        day:new Date(),
    });
})

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
