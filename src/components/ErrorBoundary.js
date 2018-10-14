// https://docs.sentry.io/clients/javascript/integrations/react/#expanded-usage
// https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SENTRY from '../configs/sentry';


Sentry.init({
  dsn: SENTRY,
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      // render fallback UI
      return (
        <a onClick={() => Sentry.showReportDialog()}>フィードバック送信</a> // eslint-disable-line
      );
    }
    // when there's not an error, render children untouched
    return children;
  }
}
ErrorBoundary.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  children: PropTypes.object.isRequired, // eslint-disable-line
};

export default ErrorBoundary;
