const express = require("express");

const URL = require("./models/url");
const path = require("path");
const { connecToMonGoDb } = require("./connection");

const { handelGenerateNewShortURL } = require("./controllers/url");
const{checkForAuthentication, restrictTo}=require("./middlewares/auth")
const{restrictToLogedinUserOnly, checkAuth}=require("./middlewares/auth")
const cookieParser=require('cookie-parser');

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoutes=require('./routes/user')

const app = express();
const PORT = 8001;

connecToMonGoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongose server Started....")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user", userRoutes);
app.use("/", staticRoute);
app.use(checkForAuthentication);
app.use("/",checkAuth, staticRoute);


app.get("/url/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
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


app.listen(PORT, () => console.log("Server Started at...", PORT));
