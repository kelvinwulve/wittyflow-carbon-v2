import { SYSTEM_SETTINGS, UPDATE_STATS, UNAUTHORIZED, SAVE_USER, GET_DEV_APPS, GET_DEV_APPS_SUCCESS, GET_DEV_APPS_FAILED,USER_WALLET_INFO} from './Auth/action-types';
import { get, post } from '../../services/Transport';


export const updateUser = () => dispatch =>{

    get('/profile/user-party')
    .then(res =>{
        //  toast.success('User updated successfully');
        // alert(res.data.data.user_name)
         dispatch({
             type: SAVE_USER,
             payload: res.data.data
         })
         get('/statistics/usage')
        .then(res =>{
            dispatch({
                type: UPDATE_STATS,
                payload: res.data.data
            })
        })
        get('/system/settings').then(res=>{
            dispatch({
                type: SYSTEM_SETTINGS,
                payload: res.data.data
            })
        })
        get('/statistics/wallet').then(res=>{
            dispatch({
                type: USER_WALLET_INFO,
                payload: res.data.data
            })
        })
    })
    .catch(err =>{
        if(err.response){
            if(err.response.status === 403){
                dispatch({
                    type: UNAUTHORIZED
                })
            }
        }
    })

}


export const signOut = () => dispatch => {
    post('/auth/signout',{},null)
    .then(res=>{
        // Auth.signout();
        dispatch({
            type: UNAUTHORIZED
        })
    }).catch(err =>{

    });
}


export const getDeveolperApps = () => dispatch =>{
    dispatch({
        type: GET_DEV_APPS
    })

    get('/apps').then(res =>{
        dispatch({
            type: GET_DEV_APPS_SUCCESS,
            payload: res.data.data
        })
    }).catch(err =>{
        if(err.response){
            dispatch({
                type: GET_DEV_APPS_FAILED,
                payload: err.response.data.message
            });
            if(err.response.status === 403){
                dispatch({
                    type: UNAUTHORIZED
                })
            }
        }
    })
}


export const getSmsOverview = state => {
    
}