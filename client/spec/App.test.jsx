import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../components/App';

test('App component snapshot test', () => {
  const component = renderer.create(<Router><App /></Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
