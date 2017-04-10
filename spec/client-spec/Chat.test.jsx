import { renderIntoDocument } from 'react-dom/test-utils';
import React from 'react';
import renderer from 'react-test-renderer';
import Chat from '../../client/components/room/Chat';

test('Chat component snapshot test', () => {
  const component = renderer.create(<Chat />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Chat component should be a stateful class component', () => {
  expect(React.Component.isPrototypeOf(Chat)).toEqual(true);
});
