import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router';

import Navbar from './navbar/navbar';
import SessionFormContainer from './session/session_form_container';
import WelcomePageContainer from './welcome_page/welcome_page_container';
import Footer from './footer/footer';

import Workspace from './workspace/workspace';

const App = () => {
  return (
    <section className="app">
      
      <AuthRoute
        component={Navbar} />
      <Switch>
        <ProtectedRoute
          component={Workspace}
          path="/channels"
          />
        <AuthRoute
          component={SessionFormContainer}
          path="/login"/>
        <AuthRoute
          component={SessionFormContainer}
          path="/signup"/>
        <AuthRoute
          component={SessionFormContainer}
          path="/guest-login"/>
        <AuthRoute
          component={WelcomePageContainer}
          path="/"/>
      </Switch>
      <AuthRoute
        component={Footer} />
    </section>
  );
};

export default App;
