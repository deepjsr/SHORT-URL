const shortid = require('shortid');
 const URL=require('../models/url')

async function handelGenerateNewShortURL(req,res){
    const body=req.body;
    if (!body.url) return res.status(400).json({error:"URL is required "});
    const shortId=shortid();

    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visiteHistory:[],

    })

    return res.render("home",{
        id:shortId
    });
}

async function handelGetAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result= await URL.findOne({shortId});
    return res.json(
        {
            totalClicks:result.visitHistory.length,
            analytics:result.visitHistory,
        }
    )
}

module.exports={
     handelGenerateNewShortURL,handelGetAnalytics
}