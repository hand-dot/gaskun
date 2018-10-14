import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaselines from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';
import WithTracker from './components/WithTracker';
import theme from './assets/theme';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <ErrorBoundary>
        <CssBaselines />
        <Route component={WithTracker(App, { /* additional attributes */ })} />
      </ErrorBoundary>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
