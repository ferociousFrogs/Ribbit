import React from 'react';
import renderer from 'react-test-renderer';
import Chat from '../../client/components/room/Chat';

test('Chat component snapshot test', () => {
  const component = renderer.create(<Chat />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
