import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router';

import NavbarContainer from './navbar/navbar_container';
import SessionFormContainer from './session/session_form_container';
import WelcomePageContainer from './welcome_page/welcome_page_container';
import Footer from './footer/footer';

import Workspace from './workspace/workspace';

const App = () => {
  return (
    <section className="app">
      
      <AuthRoute
        component={NavbarContainer} />
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
      <Footer />
    </section>
  );
};

export default App;
