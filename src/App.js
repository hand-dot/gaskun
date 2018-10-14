import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import UnitConverter from './UnitConverter';
import Development from './Development';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
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

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function App(props) {
  const { classes } = props;
  return (
    <Router>
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
          <Route exact path="/" component={Home} />
          <Route exact path="/unit-converter" component={UnitConverter} />
          <Route exact path="/production-calc" component={Development} />
          <Route exact path="/storage-calc" component={Development} />
          <Route exact path="/qa" component={Development} />
          <Route exact path="/maxflowrate-calc" component={Development} />
          <Route exact path="/pressureloss-calc" component={Development} />
          <Route exact path="/reducingvalve-calc" component={Development} />
          <Route exact path="/purgegas-estimation" component={Development} />
        </div>
        <footer className={classNames(classes.footer, classes.layout)}>
          <Grid container spacing={32} justify="space-evenly">
            {footers.map(footer => (
              <Grid item xs key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map(item => (
                  <Typography key={item} variant="subtitle1" color="textSecondary">
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </footer>
      </React.Fragment>
    </Router>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(App);
