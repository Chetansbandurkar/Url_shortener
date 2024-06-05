const shortid=require("shortid");
const URL=require('../models/url');
// https://github.com/piyushgargdev-01/short-url-nodejs/tree/main
async function handleGenerateNewShortURL(req,res){
  const body=req.body;
  if(!body.url) return res.status(400).json({error:'url is required'});
  const shortID=shortid();
  await URL.create({
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[],
    // id from middlewear
    createdBy:req.user._id,
  });
// so return html page 
  return res.render('home',{
    id:shortID,
  });
  // return res.json({id:shortID});
}
async function handleGetAnalytics(req,res){
  const shortId=req.params.shortId;
  const result=await URL.findOne({shortId});
  return res.json({
    totalClicks:result.visitHistory.length,
    analytics:result.visitHistory,
  });
}
module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}

// npm.js 
// short id'
// npm i nano id

// nanoid(80)
// have to pass the length ,then utna url generate ho jayege