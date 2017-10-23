import React from 'react';
import { AuthRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';

const App = () => {
  return (
    <section>
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
