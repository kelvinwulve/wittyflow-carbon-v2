import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import IndexPage from "./IndexPage";
import Header from "./Header";
import Footer from "./Footer";
import routes from "../../routes";

class FrontPageTemplate extends Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        // console.log(prop.layout + prop.path);
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
    return (
      <>
        <Header />
        <Switch>{this.getRoutes(routes)}</Switch>
        <Footer />
      </>
    );
  }
}

export default FrontPageTemplate;
