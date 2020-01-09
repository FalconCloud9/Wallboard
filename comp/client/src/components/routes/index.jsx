import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from '../Dashboard';
import Config from '../Config';
import Canvas from '../Config/Canvas';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/config" component={Config} />
        <Route path="/:id/edit" component={Canvas} />
      </Switch>
    </Router>
  )
}