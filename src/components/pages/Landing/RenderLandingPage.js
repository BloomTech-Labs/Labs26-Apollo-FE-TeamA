import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";

function RenderLandingPage(props) {
  const history = useHistory();

  const signup = () => {
    history.push("/signup");
  };

  const login = () => {
    history.push("/login");
  };

  return (
    <div>
      <h1>Apollo</h1>
      <div>
        <p>
          This is an example of how we'd like for you to approach page/routable
          components.
        </p>

        <p>
          <Button type="secondary" onClick={signup}>
            Sign Up
          </Button>
          <Button type="primary" onClick={login}>
            Log In
          </Button>
        </p>
      </div>
    </div>
  );
}
export default RenderLandingPage;
