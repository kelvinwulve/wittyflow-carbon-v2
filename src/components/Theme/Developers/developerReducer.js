import {
    ADD_DEV_APP,
    ADD_DEV_APP_FAILED,
    ADD_DEV_APP_SUCCESS,
    TOGGLE_ADD_MODAL,
    TOGGLE_UPDATE_MODAL,
    UPDATE_APP,
    UPDATE_APP_FAILED,
    UPDATE_APP_SUCCESS,
    CHANGE_APP_STATUS_FAILED,
    CHANGE_APP_STATUS_SUCCESS
} from '../Auth/action-types';
import { TOGGLE_DELETE_MODAL, DELETE_APP, DELETE_APP_FAILED, DELETE_APP_SUCCESS } from './action.types';

export default function(state, action) {
    switch (action.type) {
        case ADD_DEV_APP:
            return{
                ...state,
                loading: true
            }
        case ADD_DEV_APP_SUCCESS:
            return Object.assign({},state,{
                apps: [action.payload, ...state.apps],
                loading: false
            });
        case ADD_DEV_APP_FAILED: 
            return{
                ...state,
                loading: false
            }
        case TOGGLE_ADD_MODAL:
            return{
                ...state,
                show_add_modal: !state.show_add_modal
            }
        case TOGGLE_UPDATE_MODAL:
            return{
                ...state,
                show_update_modal: !state.show_update_modal
            }
        case TOGGLE_DELETE_MODAL:
            return {
                ...state,
                show_delete_modal: !state.show_delete_modal
            }    
        case UPDATE_APP:
            return{
                ...state,
                updating: true
            }
        case UPDATE_APP_SUCCESS: 
            const apps = state.apps;
            const index = state.apps.findIndex(el => el.app_id === action.payload.app_id);
            apps[index] = action.payload;
            return {
                ...state,
                apps,
                updating: false,
                show_update_modal: false
            }
        case UPDATE_APP_FAILED:
            return {
                ...state,
                updating: false
            }
        case CHANGE_APP_STATUS_SUCCESS:
            return {
                ...state,
                apps: [ action.payload, ...state.apps.filter(el => el.app_id !== action.payload.app_id) ]
            } 
        case CHANGE_APP_STATUS_FAILED: 
            return {
                ...state
            }
        case DELETE_APP:
            return {
                ...state,
                deleting: true
            }
        case DELETE_APP_FAILED:
            return {
                ...state,
                deleting: false
            }
        case DELETE_APP_SUCCESS:
            return {
                ...state,
                deleting: false,
                show_delete_modal: false,
                apps: [...state.apps.filter(el => el.app_id !== action.payload.app_id) ]
            }            
        default:
            return state;
    }
}