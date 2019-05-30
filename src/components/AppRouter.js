import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, Users } from '../pages/'

export const AppRouter = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/users/" component={Users} />
  </Router>
);
