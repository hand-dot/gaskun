import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  Switch, Route, Link, withRouter,
} from 'react-router-dom';
import Home from './Home';
import UnitConverter from './services/UnitConverter';
import Development from './services/Development';
import Footer from './Footer';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
});

function App(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Button>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <Typography variant="h4" style={{ marginRight: '0.25rem' }}>
                <span role="img" aria-label="logo">💭</span>
              </Typography>
              <Typography variant="h6" style={{ color: '#fff' }}>
                ガスくん
              </Typography>
            </Link>
          </Button>

        </Toolbar>
      </AppBar>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/unit-converter" component={UnitConverter} />
          <Route exact path="/production-calc" component={Development} />
          <Route exact path="/storage-calc" component={Development} />
          <Route exact path="/qa" component={Development} />
          <Route exact path="/maxflowrate-calc" component={Development} />
          <Route exact path="/pressureloss-calc" component={Development} />
          <Route exact path="/reducingvalve-calc" component={Development} />
          <Route exact path="/purgegas-estimation" component={Development} />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withRouter(withStyles(styles, { withTheme: true })(App));
