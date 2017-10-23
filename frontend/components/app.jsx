import React from 'react';
import { AuthRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import Navbar from './navbar/navbar';

import WelcomePageContainer from './welcome_page/welcome_page_container';

const App = () => {
  return (
    <section>
      <Navbar />
      <AuthRoute
        component={WelcomePageContainer}
        path="/"/>
      <AuthRoute
        component={SessionFormContainer}
        path="/login"/>
      <AuthRoute
        component={SessionFormContainer}
        path="/get-started"/>
    </section>
  );
};

export default App;
