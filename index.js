const express = require("express");

const app = express();
const { connectToMongoDb } = require('./connect');
const URL = require("./models/url")
const PORT = 8001;
const path=require('path')
const cookieParser=require('cookie-parser')
const {checkforAuthentication,restrictTO}=require('./middlewear/auth')
const urlRoute = require("./routes/url");
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user')


// Middlewears->2
// to parse the json data 
app.use(express.json());
// to parse the form data 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
// will run on every request when the page is loaded 
// when thw server get restarted 
app.use(checkforAuthentication);
// connect to the mongo db 
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("Mongo Db connected"));

// set the view engine to ejs
// views file are not but the html files
// we also have to tell that where are the views files
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

// check karge ki user login he ki nhi to bad me 
// login raha to 
// ./middlewear/auth
app.use('/url',restrictTO(["NORMAL","ADMIN"]),urlRoute);
app.use('/user',userRoute);
// home pe ane ke bad  check kareag ki login he ki nhi bad me 
// vo ./middlewear/auth/check auth me jayega agar nhi mila to 
// static route pe jayega aur agar user nhi mila to /login pe bhej dega
app.use('/',staticRoute);

// in ejs we have many function like the js
// have for each loop and etc 
app.get("/", async (req, res) => {
    const allurls = await URL.find({});
    // rendering the home page from the views 
    // u can also sen the extra data
    return res.render("home",{
        urls:allurls,
    });
});
app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at the port:${PORT}`));

