const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');
const morgan = require('morgan');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
//app.use(cors());
const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT_LOCAL}`, // This is the origin of the request (your React frontend URL)
  credentials: true, // Indicates whether or not the response to the request can be exposed when the credentials flag is true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./middlewares/public")));
morgan.token("custom-date", (req, res) => {
  return new Date().toUTCString();
});
app.use(
  morgan(
    ":custom-date :method :url :status :res[content-length] - :response-time ms"
  )
);
console.log(morgan);
app.use('/api',router);

module.exports = app;
