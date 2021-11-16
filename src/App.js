import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../src/components/Theme/static/vendor/themify-icons/themify-icons.css";
import Carbon from "./components/Theme/Carbon";
import AuthLayout from "./components/Theme/Auth/Auth";
import { NotificationContainer } from "react-notifications";
import AuthContextProvider from "./redux/AuthContext";
import BillingContextProvider from "./redux/BillingContext";
import ReactTooltip from "react-tooltip";
import "react-datepicker/dist/react-datepicker.css";
import "./static/css/override.css";
import "./static/vendor/ladda/ladda.min.css";
import "./static/js/jquery-loader.js";




function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <BillingContextProvider>
          <Router>
            <Switch>
              <Route
                path="/v1"
                render={(props) => (
                  <Carbon {...props} history={props.history} />
                )}
              />
              <Route
                path="/auth"
                render={(props) => (
                  <AuthLayout {...props} history={props.history} />
                )}
              />
              <Redirect from="/" to="/auth/signin" />
            </Switch>
          </Router>
          <NotificationContainer />
          <ReactTooltip />
        </BillingContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
