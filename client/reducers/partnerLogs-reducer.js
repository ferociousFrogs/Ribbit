const dummyPartnerLogsData = [{ code: '', messages: [{ userName: 'Father Vito Cornelius', text: 'hello there!' }, { userName: 'Father Vito Cornelius', text: 'oh hai!' }, { userName: 'Father Vito Cornelius', text: 'so nervous!' }] }];
const partnerLogsReducer = (state = dummyPartnerLogsData, action) => {
  switch (action.type) {
    case 'GET_PARTNER_LOGS':
      return [
        ...state,
        action.partnerLogs
      ];
    default:
      return state;
  }
};

export default partnerLogsReducer;
