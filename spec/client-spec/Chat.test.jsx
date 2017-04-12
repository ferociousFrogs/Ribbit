import { renderIntoDocument } from 'react-dom/test-utils';
import React from 'react';
import renderer from 'react-test-renderer';
import Chat from '../../client/components/room/Chat';
import io from 'socket.io-client';

test('Chat component snapshot test', () => {
  const component = renderer.create(<Chat />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Chat component should be a stateful class component', () => {
  expect(React.Component.isPrototypeOf(Chat)).toEqual(true);
});

// test('Chat should emit events and pick up responses via listeners', () => {
//   const port = process.env.PORT || 3000;
//   const server = `http://localhost:${port}`;
//   const socket = io(server);
//   // const updateResponse = message => message;
//   // const final = updateResponse();
//   socket.emit('chat message', 'Aww hell no, wut up, dawg?');
//   socket.on('chat message', );
//   expect('hello').toEqual('Aww hell no, wut up, dawg?');
// });
