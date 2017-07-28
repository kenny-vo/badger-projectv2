const express       = require('express');
const path          = require('path');
const bodyParser     = require('body-parser');
const cors          = require('cors');
const passport      = require('passport');
const mongoose      = require('mongoose');

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// Cors Middlewear
app.use(cors());

// Body Parser Middlewear
app.use(bodyParser.json());

app.use('/users', users)

// Index Route
app.get ('/', (req, res) => {
  res.send('Invalid Endpoint');
})

// Start server
app.listen(port, () => {
  console.log('Server on port ' + port);
})
