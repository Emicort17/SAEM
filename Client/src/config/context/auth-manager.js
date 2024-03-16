export const authManager = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...action.payload,
        signed: true,
      };
    case 'SIGNOUT':
      return {
        signed: false,
      };
    default:
      return state;
  }
};
