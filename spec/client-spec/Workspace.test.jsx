import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Workspace from '../../client/components/room/Workspace';

describe('Workspace should exist and render', () => {
  test('Workspace component should be a stateful class component', () => {
    expect(React.Component.isPrototypeOf(Workspace)).toEqual(true);
  });

  test('Workspace should have a component named CodeMirror', () => {
    const cmName = shallow(<Workspace/>).node.props.children[0].type.displayName;
    expect(cmName).toEqual('CodeMirror');
  });

  test('Workspace should have an initial value', () => {
    const cmValue = shallow(<Workspace/>).node.props.children[0].props.value;
    expect(cmValue).toEqual('// Ribbit\nfunction ribbit() {\n return "Ribbit";\n};\nribbit();');
  });

});
