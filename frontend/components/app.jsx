import React from 'react';
import { AuthRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import Navbar from './navbar/navbar';

const App = () => {
  return (
    <section>
      <Navbar />
      <AuthRoute
        component={SessionFormContainer}
        path="/login"/>
      <AuthRoute
        component={SessionFormContainer}
        path="/signup"/>
    </section>
  );
};

export default App;
