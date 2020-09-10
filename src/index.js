import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch
} from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";

// ant design library
import "antd/dist/antd.less";

// AOS animation library
import AOS from "aos";
import "aos/dist/aos.css";

import { NotFoundPage } from "./components/pages/NotFound";
import { ExampleListPage } from "./components/pages/ExampleList";
import { ProfileListPage } from "./components/pages/ProfileList";
import { SignUpPage } from "./components/pages/SignUp";
import { LoginPage } from "./components/pages/Login";
import { HomePage } from "./components/pages/Home";
import { LandingPage } from "./components/pages/Landing";
import { config } from "./utils/oktaConfig";
import { LoadingComponent } from "./components/common";
import NavBar from "./components/common/NavBar";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

function App() {
  AOS.init();

  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push("/login");
  };

  return (
    <>
      <NavBar />
      <Security {...config} onAuthRequired={authHandler}>
        <Switch>
          <Route path="/landing" component={LandingPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/implicit/callback" component={LoginCallback} />
          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <SecureRoute
            path="/"
            exact
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          <SecureRoute path="/example-list" component={ExampleListPage} />
          <SecureRoute path="/profile-list" component={ProfileListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Security>
    </>
  );
}
