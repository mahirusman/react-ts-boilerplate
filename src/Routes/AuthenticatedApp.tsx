import React, { useEffect, useState } from "react";
import { useRouteMatch, withRouter, Route, Switch, useLocation, Redirect } from "react-router-dom";
import WelcomePage from "../components/Welcome";

const App: React.FC = () => {
  const match = useRouteMatch("*");
  const location = useLocation();
  const user = false || true;
  const [baseRoute, ...otherRoutes] = match && match.url ? match.url.substr(1).split("/") : [];

  const from = { pathname: "/today" };
  const inviteId: string | null = null;

  const isInviteAcceptPath = useRouteMatch("/invites/:inviteId/accept");

  if (user) {
    return (
      <div>
        <main className="w-full h-full overflow-hidden relative">
          <Switch location={location}>
            <Redirect from="/login" to={from} />
            <Redirect from="/signup" to={from} />
            <Redirect from="/" to="/today" exact />

            <Route
              path="/subscription"
              exact
              render={() => {
                if (false) {
                  return <Redirect to="/" />;
                }
                // return <SubscriptionPage />;
              }}
            />
          </Switch>
        </main>
      </div>
    );
  }
  return <WelcomePage />;
};

export default withRouter(App);
