import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Workspace } from '../../client/components/room/Workspace';

describe('Workspace should exist and render', () => {
  const enzymeWrapper = shallow(<Workspace />);
  it('should be a stateful class component', () => {
    expect(React.Component.isPrototypeOf(Workspace)).toEqual(true);
  });

  it('Workspace should have a component named CodeMirror', () => {
    expect(enzymeWrapper.find('CodeMirror').length).toEqual(1);
  });

  test('Workspace should have an initial value', () => {
    const cmValue = shallow(<Workspace />).node.props.children[0].props.value;
    expect(cmValue).toEqual('// Ribbit\nfunction ribbit() {\n return 1 * 100000 + "Ribbits";\n};\nribbit();');
  });
});
