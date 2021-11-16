import { post,  deletee } from '../../../services/Transport';
import { NotificationManager } from 'react-notifications';

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
    CHANGE_APP_STATUS_SUCCESS,
    TOGGLE_DELETE_MODAL,
    DELETE_APP,
    DELETE_APP_SUCCESS,
 } from './action.types';
 import { UNAUTHORIZED } from '../Auth/action-types';


export const addDeveloperApp = ({ name, description, whitelist }) => dispatch =>{
    dispatch({ 
        type: ADD_DEV_APP
     })
    post('/apps/create',{
        name,
        description,
        // whitelist: whitelist.length > 0 ? whitelist :["0.0.0.0"] 
      },null)
      .then(res =>{
        NotificationManager.success("App added successfully");
        dispatch({
            type: ADD_DEV_APP_SUCCESS,
            payload: res.data.data
        })
      }).catch(err =>{
          NotificationManager.error(err.response.data.message);
        dispatch({
            type: ADD_DEV_APP_FAILED,
        })
      })
}



export const upateDeveloperApp = ({ app_id, name, description, whitelist }) => dispatch =>{
    dispatch({
        type: UPDATE_APP
    });
    post('/apps/update',{
        app_id,
        name,
        description,
        // whitelist: whitelist.length > 0 ? whitelist :["0.0.0.0"] 
      },null)
      .then(res =>{
          NotificationManager.success("App updated successfully");
          dispatch({
              type: UPDATE_APP_SUCCESS,
              payload: res.data.data
            })
        }).catch(err =>{
            NotificationManager.error(err.response.message);
        dispatch({
            type: UPDATE_APP_FAILED,
        })
      })
}



export const changeStatus = ({ app_id, status }) => dispatch => {
    const FLAG = status === "1" ? "0" : "1";
    post("/apps/status/change", { status: FLAG, app_id }, null)
      .then(res => {
        NotificationManager.success(res.data.message)
        dispatch({
            type: CHANGE_APP_STATUS_SUCCESS,
            payload: res.data.data
        })
      })
      .catch(err => {
          NotificationManager.error(err.response.data.message);
          if(err.response.status === 403){
            dispatch({
                type: UNAUTHORIZED
            })
        }
        dispatch({
            type: CHANGE_APP_STATUS_FAILED
        })
      });
};


export const deleteApp = app => dispatch => {
    dispatch({
        type: DELETE_APP
    })

    console.log(app);

    deletee(`/apps/${app.app_id}/delete`)
    .then(res =>{
        NotificationManager.success(res.data.message);
        dispatch({
            type: DELETE_APP_SUCCESS,
            payload: app
        })
    }).catch(err =>{
        NotificationManager.error(err.response.data.message);
        if(err.response.status === 403){
            dispatch({
                type: UNAUTHORIZED
            })
        }
    });
}


export const toggleAddModal = () => dispatch=> dispatch({
    type: TOGGLE_ADD_MODAL
});

export const toggleUpdateModal = () => dispatch=> dispatch({
    type: TOGGLE_UPDATE_MODAL
});

export const toggleDeleteMoal = () => dispatch => dispatch({
    type: TOGGLE_DELETE_MODAL
});