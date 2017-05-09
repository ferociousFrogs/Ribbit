# Ribbit

Ribbit is a real-time collaboration tool designed for software engineers. We aim to make pair programming hassle-free and efficient. 

![](./doc/ribbit.gif)

Ribbit leverages CodeMirror, WebRTC and Socket.io technology to consolidate all coding and communication channels into a single web application. Simply open up our site in your browser to pair program while video, voice and text chatting!

---

## Team
  - [Andy Yeo](https://github.com/misteryeo)
  - [David Brodie](https://github.com/dbrodie122)
  - [Dylan Shelters](https://github.com/dshelters)
  - [Jeff Milberger](https://github.com/jefQuery)

## Table of Contents

1. [Usage](#Usage)
1. [Technologies](#technologies)
1. [Contributing](#contributing)

## Usage

Firstly make sure that you have [Node](https://nodejs.org/en/download/) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)  installed.
Next clone this repo (https://github.com/ferociousFrogs/Ribbit.git) by entering the following into your terminal:
```
git clone https://github.com/ferociousFrogs/Ribbit.git
```
then change into that folder
```
cd Ribbit
```
install the necessary packages locally
```
npm install
```
and run webpack
```
npm run react-dev
```
and then you can start up a local server in a new tab within terminal
```
npm run server-dev
```
The local version of Ribbit defaults to port 3000, open up your browser and type [`localhost:3000`](http://localhost:3000) into your browser. Now your app should be up and running. If you'd like to run tests, please shut down the server by pressing control + c (mac) in the tab you ran react-dev. Run the testing suite by opening a new terminal tab and typing:
```
npm run test
```
Be sure to end the terminal testing process with control+c after testing has finished and restart your server with one of the server commands above. 

## Technologies

### Core
- Socket.io
- WebRTC
- CodeMirror

### Frontend
- React (ES6)
- Redux
- Router
- Bootstrap

### Backend
- Node
- Express
- postgresSQL
- Passport

### DevOps/Other
- Heroku for deployment
- Jest, Enzyme, CircleCI
- Late nights and many snacks


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
