const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const passport      = require('passport');
const mongoose      = require('mongoose');
const config        = require('./config/database');

// connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
  console.log('Database connected ' +config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database err ' +err);
});

const app = express();

const users = require('./routes/users');

// Port number
const port = process.env.PORT || 8080;

// Cors Middlewear
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middlewear
app.use(bodyParser.json());

// Passport Middlewear
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users)

// Index Route
app.get ('/', (req, res) => {
  res.send('Invalid Endpoint');
})

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
app.listen(port, () => {
  console.log('Server on port ' + port);
})
