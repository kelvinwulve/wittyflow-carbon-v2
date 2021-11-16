import { get } from '../../../services/Transport';
import { SAVE_SETTINGS } from './action-types';

export const saveSettings = () =>  dispatch =>{
    get('/statistics/usage')
    .then(res =>{
        dispatch({
            type: SAVE_SETTINGS,
            payload: res.data.data
        })
    })
}