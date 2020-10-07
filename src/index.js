import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline"
/* import { debugContextDevtool } from 'react-context-devtool'; */

const root = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </React.StrictMode>,
  root
);
/* debugContextDevtool(root) */
serviceWorker.unregister();
