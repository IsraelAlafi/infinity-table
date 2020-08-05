import {initializeErrorHandler} from "./common/errorHandler";
import express from "express"
import promotion from "./controllers/promotion";
import {MONGO_DB_URL} from "./config"
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();
initializeErrorHandler(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/promotion", promotion);

mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true, useFindAndModify: false } , (err, db) => {
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db;
  app.listen(port, () => {
    console.log(`app listen to ${port} `);
  });
});

module.exports = app;


