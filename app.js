const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

//setting express
var app = express();
const MongoDBStore = require('connect-mongodb-session')(session);

// DB Config
const db = "mongodb+srv://keerthi:keerthi@cluster0-lsaj1.mongodb.net/keerthi?retryWrites=true";

//Connection mongooDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  const store = new MongoDBStore({
    uri: db,
    collection: 'sessions'
  });

  // EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Static Files
app.use(express.static('./asserts'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

//Routes
app.use('/', require('./routes/simple.js'));

//listering to port3000
app.listen(3000);

console.log('Server Started');