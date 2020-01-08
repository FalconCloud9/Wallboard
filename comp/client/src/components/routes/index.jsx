import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from '../Dashboard';
import Config from '../Config';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/config">
          <Config />
        </Route>
      </Switch>
    </Router>
  )
}