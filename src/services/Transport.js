/* eslint-disable eqeqeq */
import axios from "axios";
import Auth from '../components/Auth/Auth';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { NotificationManager } from 'react-notifications';
import {baseUrlProd} from '../Utilities/Utilities'


const networkToasts = new Set();
let MAX_NET_TOAST = 1;


function notifyNetwork(message) {
  let id;
  if(networkToasts.size < MAX_NET_TOAST){
    id = NotificationManager.error(message)
    networkToasts.add(id);
    setTimeout(() => {
      networkToasts.delete(id);
      //console.log("removed")
    }, 1000);
  }
  }


axios.defaults.baseURL = baseUrlProd;
//axios.defaults.baseURL = "http://preprod-api.wittyflow.com/x1/v1/";


/**
 * Error handling function 
 * @param error
 * 
*/

const errorhandler = (error) =>{
  //console.log(error);
  if(error.message == "Network Error"){
    notifyNetwork('Network connection lost. Check and try again');
    return Promise.reject({ ...error });
  }else if(error.response){
    const { status } = error.response;
    if(status == 403){
      // Auth.signout();
     // console.log(error)
      notifyNetwork('Session has expired. Sign in');
      return Promise.reject({ ...error });
    }else if(status === 500){
      notifyNetwork("Sorry, we couldn't process your request at this time. Try again.");
      return Promise.reject({ ...error });
    }
  }
    return Promise.reject({ ...error });
}


/**
 * 
 * Success handling function
 * 
*/

const successHandler = (response) => { 
  return response
};


/**
 * function to handle token
 * setting when making a request 
 * 
*/


const setToken = (config ={}) =>{
      const token = Auth.getAuth();
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + Auth.getToken();
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
}


/**
 * 
 * Axios response interceptor
 * 
*/

axios.interceptors.response.use(
  response =>  successHandler(response),
  error => errorhandler(error)
);

/**
 * Axios request interceptor
 * 
*/

axios.interceptors.request.use(
  config => setToken(config),
  error =>Promise.reject(error));


/**
 * Post method to be exported
 * 
*/

export const post = (route, payload, header) => new Promise(function(resolve, reject){
      axios.post(route,payload)
      .then(res => resolve(res))
      .catch(err => reject(err));
})


/**
 * Get method to be exported
 * 
*/

export const get = (route) => new Promise((resolve, reject) => {
  axios.get(route)
  .then(res => resolve(res))
  .catch(err => reject(err));
});


export const deletee = (route) => new Promise((resolve, reject)=>{
  axios.delete(route)
  .then(res => resolve(res))
  .catch(err => reject(err));
});
