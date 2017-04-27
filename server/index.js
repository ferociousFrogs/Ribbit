// express server
const app = require('express')();
const axios = require('axios');
const os = require('os');
const express = require('express');
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./initPassport');
const sockets = require('./sockets/paths');
const utils = require('./utilities/utilityFunctions');
// const url = require('url');

const LAMBDA_URL = 'https://5ingwowrx8.execute-api.us-west-2.amazonaws.com/prod/MyLambdaMicroservice';

const port = process.env.PORT || 3000;

// comment in dropNCreate when you don't want dummy data
// utils.dropNCreateDBTables():

// comment in addDummyData when you do (it will also drop and create the table before adding data)
utils.addDummyDataToDB();
  // .then(() => {
  //   const roomUser = {
  //     roomName: 'Airport',
  //     userName: 'Leeloo'
  //   };
  //   return utils.findAllRooms(roomUser);
  // })
  // .then(messages => console.log('messages', messages));


// Middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client')));
app.use(passport.initialize());
// app.use(passport.session()); Must be preceded with express.sessions if utilised

const codeParser = (code) => {
  code.value = code.value.replace(/\\n/gi, '');
  if (code.language === 'Javascript') {
    return eval(code.value);
  } else if (code.language === 'Python') {
    return 'Python coming soon!';
  } else if (code.language === 'Ruby') {
    return 'Ruby coming soon!';
  }
  return null;
};

console.log(codeParser({
  value: 'function ribbit() { return "Ribbit";};ribbit();',
  language: 'Javascript'
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/runCode', (req, res) => {
  // const result = codeParser(req.query);
  axios.post(LAMBDA_URL, {
    params: {
      code: req.query.value
    }
  })
  .then((response) => {
    console.log(response);
    res.status(200).send(JSON.stringify(response));
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send('error in your code');
  });
  // res.status(200).send(JSON.stringify(result));
});


// Facebook Routes
app.get('/fblogin', passport.authenticate('facebook'));

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
