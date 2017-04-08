import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App';

test('App component snapshot test', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
