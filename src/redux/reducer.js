import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import authReducer from '../components/Theme/Auth/authReducer';
import developerReducer from '../components/Theme/Developers/developerReducer';

const combiene = reduceReducers(authReducer,developerReducer);

// 
export default combineReducers({
    auth: combiene
});


