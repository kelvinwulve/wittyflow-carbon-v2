import { SAVE_EMAIL, READ_EMAIL } from '../actions/types';

const initialState = { 
      // email: "",
      user: null,
      loading: false,
      isAuthenticated: true 
};

export default function(state = initialState, action) {
    switch (action.type) {
      case SAVE_EMAIL:
        return {
          ...state,
          email: action.payload
        };
      case READ_EMAIL:
        return state.email 
      default:
        return state;
    }
}