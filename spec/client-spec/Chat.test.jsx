<<<<<<< HEAD
import { renderIntoDocument } from 'react-dom/test-utils';
=======
>>>>>>> Add enzyme and react test utils as dependencies
import React from 'react';
import renderer from 'react-test-renderer';
import Chat from '../../client/components/room/Chat';

test('Chat component snapshot test', () => {
  const component = renderer.create(<Chat />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
<<<<<<< HEAD

test('Chat component should be a stateful class component', () => {
  expect(React.Component.isPrototypeOf(Chat)).toEqual(true);
});
=======
>>>>>>> Add enzyme and react test utils as dependencies
