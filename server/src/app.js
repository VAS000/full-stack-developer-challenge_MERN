const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require('path');
const isOnHeroku = process.env.HEROKU !== "true" && process.env.NODE_ENV === "production";

if(!isOnHeroku) {
  require('dotenv').config({ path: path.resolve(__dirname, `./configs/.env.${process.env.NODE_ENV}`) });
}

/* DB connection */

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("connected", () => console.log("connected to mongodb"));
db.on("disconnected", () => console.log("connection to disconnected"));
db.on("error", (err) => console.log("connection error", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

/* API Routes */

const authorRouter = require('./api/author');
const bookRouter = require('./api/book');

app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

/* Errors handling */

const errorController = require('./controllers/error');

app.use(errorController.error_404);
app.use(errorController.error_global_handler);

// In REAL prod environment, frontend better to be separate from backend
if(isOnHeroku) {
  app.use(express.static())

  app.use('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));
}
 
module.exports = app;
