const express=require("express");
const URL= require("./models/url")
const { connecToMonGoDb}= require('./connection')
const urlRout=require('./routes/url');
const { handelGenerateNewShortURL } = require("./controllers/url");
const { DATE } = require("mysql/lib/protocol/constants/types");
 
const app=express();
const PORT=8001;

connecToMonGoDb('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log(("Mongose server Started....")))

app.use(express.json());

app.use('/url',urlRout);

app.get("/:shortid",async (req,res)=>{
    const shortId=req.params.shortid;
    const entry=await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
        visitHistory:{
            timestamp:Date.now()
        }
    }
});
res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>console.log("Server Started at...",PORT))