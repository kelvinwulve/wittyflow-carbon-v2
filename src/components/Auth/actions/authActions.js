import { 
    SAVE_EMAIL, 
    READ_EMAIL,
    LOGIN
} from './types';
// 

export const saveEmail = email => dispatch => dispatch({
        type: SAVE_EMAIL,
        payload: email
    })

export const readEmail = () => dispatch => dispatch({
    type: READ_EMAIL
}) 


export const login = ({ email, password }) => dispatch => {
    // do the login things here and then 

    // return dispatch
    dispatch({
        type: LOGIN,
        payload: null
    })
}