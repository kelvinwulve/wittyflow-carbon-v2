export const persistToLocalStorage = (key, data) => {
    // localStorage.setItem("" + key, JSON.stringify(data));
    localStorage.setItem("" + key, JSON.stringify(data));
  };
  
  export const retrieveFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
  };
  
  export const deleteFromLocalStorage = () => {
    localStorage.clear();
  };
  
  export const clearLocalStorage = () => {
    localStorage.clear();
  };
  
  export const log = (...items) => {
    //TODO: if in production, don't log
    console.log(...items);
  };
  
  export const getGatewayToken = path => {
    return path.substr(1).split("/")[1];
  };

  
   export const baseUrlProd = "https://api.wittyflow.com/x1/carbon"
  //export const baseUrlProd = "http://preprod-api.wittyflow.com/x1/carbon"
