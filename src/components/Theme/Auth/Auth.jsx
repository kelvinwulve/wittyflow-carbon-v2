import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import routes from "../../../routes";

class Auth extends Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return <Switch>{this.getRoutes(routes)}</Switch>;
  }
}

export default Auth;
