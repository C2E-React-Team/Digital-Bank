import * as types from '../../actions/users';


export default function(state={}, action) {

    switch(action.type) {
      case types.LOGIN_USER:      
        return action.data;
      case types.LOGOUT_USER:
        return {};
      default:
        return state;
    }
  
  }