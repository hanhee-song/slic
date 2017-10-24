import React from 'react';
import { AuthRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import NavbarContainer from './navbar/navbar_container';
import { Switch } from 'react-router';

import WelcomePageContainer from './welcome_page/welcome_page_container';

const App = () => {
  return (
    <section>
      <NavbarContainer />
      <Switch>
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
    </section>
  );
};

export default App;
