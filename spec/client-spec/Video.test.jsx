import React from 'react';
import renderer from 'react-test-renderer';
import webrtc from 'webrtc-adapter';
import Video from '../../client/components/room/Video';

test('Video component should be a stateful class component', () => {
  expect(React.Component.isPrototypeOf(Video)).toEqual(true);
});
