import React from 'react';
import renderer from 'react-test-renderer';
import Video from '../../client/components/room/Video';

test('Chat component snapshot test', () => {
  const component = renderer.create(<Video />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video component should be a stateful class component', () => {
  expect(React.Component.isPrototypeOf(Video)).toEqual(true);
});
