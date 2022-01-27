import React from 'react';
import {
  withRouter,
  Route,
  Switch,
  useLocation,
  Redirect,
} from 'react-router-dom';
import Login from '../components/LogIn';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <Switch location={location}>
        <Route path="/login" exact component={Login} />

        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      </Switch>
    </div>
  );
};

export default withRouter(App);
