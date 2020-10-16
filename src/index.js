import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline"
import "./utils/i18next"
import { CircularProgress } from '@material-ui/core';

const root = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <Suspense 
        fallback={<CircularProgress />}>
        <App />
      </Suspense>
    </React.Fragment>
  </React.StrictMode>,
  root
);
serviceWorker.unregister();
