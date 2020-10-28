import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
// TODO: add auth in future
const AUTH_SIGNIN_PATH = '/';
// import { AUTH_SIGNIN_PATH } from "./routes/auth";

const userIsLoggedIn = false;

const Router = ({ 
  component: Component,
  path,
  fallback: Fallback,
  isExact,
  isPrivate,
  redirectTo,
 }) => {

  return (
    <Suspense fallback={Fallback ? <Fallback />: <LinearProgress /> }>
      <Route
        path={path}
        exact={!!isExact}
        render={(props) =>
          redirectTo ? <Redirect to={redirectTo}/> :
            isPrivate ? (
              userIsLoggedIn ? Component && <Component {...props} /> : <Redirect to={AUTH_SIGNIN_PATH} />
            ) : Component && <Component {...props} />
        }
      />
    </Suspense>
  );
};

export default Router;