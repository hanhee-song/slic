import React from 'react';
import { AuthRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import Navbar from './navbar/navbar';
import { Switch } from 'react-router';

import WelcomePageContainer from './welcome_page/welcome_page_container';

const App = () => {
  return (
    <section>
      <Navbar />
      <Switch>
        <AuthRoute
          component={SessionFormContainer}
          path="/login"/>
        <AuthRoute
          component={SessionFormContainer}
          path="/get-started"/>
        <AuthRoute
          component={WelcomePageContainer}
          path="/"/>
      </Switch>
    </section>
  );
};

export default App;
