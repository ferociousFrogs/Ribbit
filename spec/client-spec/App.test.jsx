import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../client/components/App';
import { Provider } from 'react-redux';
import store from './../../client/store';

test('App component snapshot test', () => {
  const component = renderer.create(<Provider store={store}><Router><App /></Router></Provider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
