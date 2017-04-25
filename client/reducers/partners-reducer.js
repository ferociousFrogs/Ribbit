// reducer for populating conversation partners
const dummyPartnerData = [{ name: 'Ruby Rod', id: 'a1b2c3' }, { name: 'Diva Plavalaguna', id: '34gsdvs3' }, { name: 'Corbin Dallas', id: 'gf83dgd' }];
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
