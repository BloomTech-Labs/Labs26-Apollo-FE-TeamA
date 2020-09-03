import React, { useEffect, useState } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import { config } from '../../../utils/oktaConfig';

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        // there is more we can do to handle some errors here.
      },
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      logo: 'path-to-your-logo',
      // add your custom logo to your signing/register widget here.
      i18n: {
        en: {
          'primaryauth.title': 'Welcome to Labs Basic SPA Please sign in',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  const [stateLogin, setStateLogin] = useState({
    credentials:{
      username:'',
      password:''
    }
  })

  const handleChange = event =>{
    setStateLogin({
      credentials:{
        ...stateLogin.credentials,
        [event.target.name]:event.target.value
      }
    });
  }

  const loginSubmit = event =>{
    event.preventDefault();
  }

  return (
  <div id="sign-in-widget">
    <form onSubmit={loginSubmit}>
      <input 
        type = "text"
        name = "username"
        placeholder = "username"
        value = {stateLogin.credentials.username}
        onChange = {handleChange}
      />
      <input 
        type = "password"
        name = "password"
        placeholder = "password"
        value = {stateLogin.credentials.password}
        onChange = {handleChange}
      />
      <button>Log-in</button>
    </form>
  </div>
  )
};

export default LoginContainer;
