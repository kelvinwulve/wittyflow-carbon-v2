import * as U from "../../Utilities/Utilities";
import decode from "jwt-decode";

class Auth {
  /**
   * @param {Key: String, value:any}
   */

  authenticate(key, value) {
    U.persistToLocalStorage(key, value);
    return true;
  }

  signout() {
    U.clearLocalStorage();
    return true;
  }

  getAuth() {
    const auth_jwt_token = U.retrieveFromLocalStorage("Wittyflow_auth_jwt");
    return auth_jwt_token ? true : false;
    // return true;
  }

  getToken() {
    const auth_jwt_token = U.retrieveFromLocalStorage("Wittyflow_auth_jwt");
    return auth_jwt_token;
  }

  getAuthData() {
    const auth_jwt_data = U.retrieveFromLocalStorage("Wittyflow_auth_jwt");
    return decode(auth_jwt_data);
  }

  saveVerifyMail(email) {
    U.persistToLocalStorage("wittyflow-verify-email", email);
  }

  retrieveVerifyMail() {
    const email = U.retrieveFromLocalStorage("wittyflow-verify-email");
    return email;
  }
}

export default new Auth();
