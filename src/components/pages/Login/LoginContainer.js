import React, { useState, useEffect } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import { Modal, Button } from "antd";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { config } from "../../../utils/oktaConfig";
import header from "../../../media/header.png";

const LoginContainer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // de-structure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split("/oauth2")[0] : "",
      clientId,
      redirectUri,
      registration: {
        // there is more we can do to handle some errors here.
      },
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      logo: "path-to-your-logo",
      // add your custom logo to your signing/register widget here.
      i18n: {
        en: {
          "primaryauth.title": "Welcome to Apollo! Please sign in."
          // change title for your app
        }
      },
      authParams: {
        pkce,
        issuer,
        display: "page",
        scopes
      }
    });

    if (widget) {
      widget.remove();
      widget.renderEl(
        { el: "#sign-in-widget" },
        () => {},
        err => {
          throw err;
        }
      );
    }
  }, [visible]);

  return (
    <>
      <div className="landing">
        <div className="welcome">
          <h1>Apollo</h1>

          <p>
            Automate your stand ups with Apollo. Create a topic and define a{" "}
            <span style={{ color: "#7F64FF", fontWeight: "bold" }}>
              context
            </span>{" "}
            to align your team towards a unified goal. Reply to topic responses
            to remove blockers and streamline your team efficiency.
          </p>

          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            Log In
          </Button>
        </div>

        <img
          data-aos="flip-down"
          data-aos-delay="300"
          className="header-img"
          src={header}
          alt="apollo features preview"
        ></img>
      </div>

      {visible ? <div id="sign-in-widget" /> : null}
    </>
  );
};

export default LoginContainer;
