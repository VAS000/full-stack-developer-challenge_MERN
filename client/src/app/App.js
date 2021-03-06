import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from '../layout/Navbar/Navbar';
import Router from '../router/Router';
import routes from '../router';

console.log(process.env);

console.log("registered routes", routes);

const App = () => (
  <BrowserRouter>
    
    <Navbar />

      <Switch>
        {routes.map(route => {
          // console.log({route });
          return (
            <Router
              key={route.path}
              {...route}
            />
          )
        })}

        <Route path="/404" render={() => <h1>Page Not Found!</h1>}/>
        <Redirect to="/404" /> 
      </Switch>
  </BrowserRouter>

);


export default App;