// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import NotFound from './components/NotFound';

import Home from './components/Home';
import About from './components/About';
import Scatter from './components/Scatter';
import ContourPlot from './components/ContourPlot';
import DirectedGraphEditor from './components/DirectedGraphEditor';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/scatter" component={Scatter} />
    <Route path="/contourplot" component={ContourPlot} />
    <Route path="/directedgrapheditor" component={DirectedGraphEditor} />

    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;