# Ribbit

> Ribbit is an online collaboration tool. Simply open up our site in your browser, video and text chat with your partner,
and write code as a team!

## Team

  - Andy Yeo
  - David Brodie
  - Dylan Shelters
  - Jeff Milberger

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

Be sure that you're running the latest version of Node

## Requirements

- Node 6.4.x
- Postgresql 9.1.x
- nodemon 1.11.x (optional)


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g bower
npm install
bower install
```
In a separate terminal tab:
```npm run react-dev```

In another terminal tab (nodemon):
```npm run server-dev```

Or (node):
```npm start```


The local version of Ribbit defaults to port 3000, open up your browser and type localhost:3000 to use the app.

## Testing

Shut down the server by selecting the terminal tab where you ran `npm run server-dev` and pressing control+c (mac).

Run the testing suite by opening a new terminal tab and typing:
```npm run test```

Be sure to end the terminal testing process with control+c after testing has finished and restart your server with one of the server commands above.

### Roadmap

View the project roadmap [here](#https://trello.com/b/fxB3Crdr/ribbit)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
