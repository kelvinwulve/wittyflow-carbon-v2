import { SAVE_EMAIL, READ_EMAIL, SAVE_USER, SYSTEM_SETTINGS, UPDATE_STATS, UNAUTHORIZED, GET_DEV_APPS, GET_DEV_APPS_FAILED, GET_DEV_APPS_SUCCESS,USER_WALLET_INFO } from './action-types';
import Auth from '../../Auth/Auth';

const initialState = { 
  email: "",
  user: null,
  settings: null,
  stats: null,
  apps: null,
  fetchingApps: false,
  fetchingAppsError: false,
  fetchingAppsErrorMessage: "" , 
  user_wallet_info:null
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
      case SAVE_USER:
        return {
          ...state,
          user: action.payload
        } 
      case SYSTEM_SETTINGS:
        return {
          ...state,
          settings: action.payload
        }
      case UPDATE_STATS:
        return {
          ...state,
          stats: action.payload
        }
      case GET_DEV_APPS:
        return {
          ...state,
          fetchingApps: true
        }  
      case GET_DEV_APPS_FAILED:
        return {
          ...state,
          fetchingApps: false,
          fetchingAppsError: true,
          fetchingAppsErrorMessage: action.payload
        } 
      case GET_DEV_APPS_SUCCESS:
        return {
          ...state,
          fetchingApps: false,
          apps: action.payload
        }   
      case USER_WALLET_INFO:
        return {
          ...state,
         user_wallet_info:action.payload
        }   
      case UNAUTHORIZED:
        Auth.signout();
        return {
          ...state,
          unauthorized: true,
          user: null
        }         
      default:
        return state;
    }
}