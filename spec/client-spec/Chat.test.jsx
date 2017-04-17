import React from 'react';
import { shallow } from 'enzyme';
import { Chat } from '../../client/components/room/Chat';

function setup() {
  const props = {
    sendMessage: jest.fn(),
    addUserName: jest.fn(),
    addTodo: jest.fn()
  };

  const enzymeWrapper = shallow(<Chat {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Chat', () => {
  it('should be a stateful class component', () => {
    expect(React.Component.isPrototypeOf(Chat)).toEqual(true);
  });

  it('should render ChatWindow and form and input', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ChatWindow').length).toEqual(1);
    expect(enzymeWrapper.find('form').length).toEqual(1);
    expect(enzymeWrapper.find('input').length).toEqual(1);
    expect(enzymeWrapper.find('button').length).toEqual(1);
  });
});
