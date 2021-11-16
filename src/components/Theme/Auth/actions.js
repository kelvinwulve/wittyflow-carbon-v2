import { 
    SAVE_EMAIL, 
    READ_EMAIL,
    LOGIN,
    SAVE_USER
} from './action-types';
import decode from 'jwt-decode';


export const saveEmail = email => dispatch => dispatch({
        type: SAVE_EMAIL,
        payload: email
    })

export const readEmail = () => dispatch => dispatch({
    type: READ_EMAIL
}) 

export const saveUser = token => dispatch => {
    const user = decode(token).data;
    dispatch({
        type: SAVE_USER,
        payload: user
    });
}


export const login = ({ email, password }) => dispatch => {
    // do the login things here and then 

    // return dispatch
    dispatch({
        type: LOGIN,
        payload: null
    })
}