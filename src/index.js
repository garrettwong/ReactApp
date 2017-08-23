// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();



// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Routes from './routes';
import App from './App';

import './index.css';

ReactDOM.render(
  <App children={{main: <Routes history={browserHistory} />}} />,
  document.getElementById('root')
);
