// express server
const app = require('express')();
const os = require('os');
const express = require('express');
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./initPassport');
const sockets = require('./sockets/paths');
const utils = require('./utilities/utilityFunctions');
// const url = require('url');
const axios = require('axios');

const url = process.env.url || 'http://localhost';
const port = process.env.PORT || 3000;

// comment in dropNCreate when you don't want dummy data
// utils.dropNCreateDBTables():

// comment in addDummyData when you do (it will also drop and create the table before adding data)
// utils.addDummyDataToDB();
  // .then(() => {
  //   const roomUser = {
  //     roomName: 'Airport',
  //     userName: 'Leeloo'
  //   };
  //   return utils.findAllRooms(roomUser);
  // })
  // .then(messages => console.log('messages', messages));

// and if you just want to create tables if they don't already exist
utils.createTablesIfNotExists();

// Middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client')));
app.use(passport.initialize());
// app.use(passport.session()); Must be preceded with express.sessions if utilised


// Routes
app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/runCode', (req, res) => {
  // call the seperate server
  const codeToEval = req.query;
  console.log(codeToEval);
  axios.get(`${url}:8080/evalCode`, {
    params: {
      code: codeToEval
    }
  })
  .then((result) => {
    console.log(result.data);
    res.status(200).send(result.data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/fbcheck',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

app.get('*', (req, res) => {
  const options = {
    root: './client/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  const fileName = req.params.name;
  console.log(fileName);
  res.sendFile('index.html', options, (err) => {
    if (err) {
      console.error(err);
      // res.status(404).send('404, page not found');
    } else {
      console.log('Sent:', fileName);
    }
  });
});

// sockets
sockets(http);

http.listen(port, () => {
  console.log(`Ribbit app listening on port ${port}!`);
});

module.exports = app;
