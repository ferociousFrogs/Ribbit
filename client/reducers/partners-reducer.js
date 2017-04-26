// reducer for populating conversation partners
const dummyPartnerData = [{ name: 'Ruby Rhod', fbToken: 'a1b2c3' }, { name: 'Diva Plavalaguna', fbToken: '34gsdvs3' }, { name: 'Korben Dallas', fbToken: 'gf83dgd' }];
const partnersReducer = (state = dummyPartnerData, action) => {
  switch (action.type) {
    case 'GET_PARTNERS':
      return [
        ...state,
        action.partners
      ];
    default:
      return state;
  }
};

export default partnersReducer;
