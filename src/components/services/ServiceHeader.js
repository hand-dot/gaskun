import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import services from '../../resource/services.json';

const styles = theme => ({
  head: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing.unit,
  },
});

function ServiceHeader(props) {
  const { location, classes } = props;
  const service = services.find(s => s.id === location.pathname.replace('/', ''));
  return (
    <Typography variant="h5" gutterBottom className={classes.head}>
      <span role="img" aria-label="logo">
        {service.icon}
        {' '}
      </span>
      {service.title}
    </Typography>
  );
}

ServiceHeader.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(ServiceHeader);
