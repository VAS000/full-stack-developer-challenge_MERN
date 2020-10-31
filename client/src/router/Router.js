import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { Container, LinearProgress, makeStyles} from "@material-ui/core";

// TODO: add auth in future
const AUTH_SIGNIN_PATH = '/';
// import { AUTH_SIGNIN_PATH } from "./routes/auth";

const userIsLoggedIn = false;

const useStyles = makeStyles(theme => {
  console.log({theme});
  return {
    root: {
      padding: '64px 0 0',
      [theme.breakpoints.down('xs')]: {
        paddingTop: '56px',
      },
    },
  };
});

const Router = ({ 
  component: Component,
  path,
  fallback: Fallback,
  isExact,
  isPrivate,
  redirectTo,
 }) => {

  const classes = useStyles();

  return (
    <Suspense fallback={Fallback ? <Fallback />: <LinearProgress className={classes.root} /> }>
      <Route
        path={path}
        exact={!!isExact}
        render={(props) =>
          redirectTo ? <Redirect to={redirectTo}/> :
            isPrivate ? (
              userIsLoggedIn ? Component && <Component {...props} /> : <Redirect to={AUTH_SIGNIN_PATH} />
            ) : Component && <Container maxWidth="md" style={{paddingTop: '80px'}}><Component {...props} /></Container>
        }
      />
    </Suspense>
  );
};

export default Router;