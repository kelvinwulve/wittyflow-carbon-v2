import { 
    createStore, 
    applyMiddleware, 
    compose 
  } from "redux";
  import thunk from "redux-thunk";
  import rootReducer from "./reducer";
  import { loadState, saveState } from './LocalStorage';
  
  const initialState = loadState();
  const middleware = [thunk];
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      //TODO
      //THIS IS FOR REACT DEVTOOLS AND MUST BE TAKEN OFF IN PROD
      (window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
  );
  
  store.subscribe(()=>{
    saveState(store.getState())
  });

// 
  

  export default store;