const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const proxyServer = `http://${process.env.PROXYMESH_USERNAME}:${process.env.PROXYMESH_PASSWORD}@us-dc.proxymesh.com:31280`;
const options = new chrome.Options().addArguments(`--proxy-server=${proxyServer}`);
const driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();


const MONGODB_URI =
  "mongodb+srv://tanmaysain02:7ImbgsvnVqQWQ6JM@scrapping01.m3rm4qd.mongodb.net/twitter_trends";

const app = express();
const client = new MongoClient(MONGODB_URI);

app.set("view engine", "ejs");
app.set("views", "views");

const indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/index", indexRoutes);


mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log("Database Connected!")
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
});