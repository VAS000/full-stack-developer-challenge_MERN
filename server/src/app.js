const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, `./configs/.env.${process.env.NODE_ENV}`) });

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

app.use('/api/authors', authorRouter);


/* Errors handling */

const errorController = require('./controllers/error');

app.use(errorController.error_404);
app.use(errorController.error_global_handler);

module.exports = app;
