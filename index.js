const express = require("express");

const URL = require("./models/url");
const path = require("path");
const { connecToMonGoDb } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { handelGenerateNewShortURL } = require("./controllers/url");
const { DATE } = require("mysql/lib/protocol/constants/types");

const app = express();
const PORT = 8001;

connecToMonGoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongose server Started....")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use("/url", urlRoute);
app.use("/", staticRoute);


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
