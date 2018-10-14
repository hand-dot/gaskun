import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import services from '../../resource/services.json';

function ServiceHeader(props) {
  const { location } = props;
  const service = services.find(s => s.id === location.pathname.replace('/', ''));
  return (
    <Typography variant="h4" gutterBottom>
      <span role="img" aria-label="logo">
        {service.icon}
        {' '}
      </span>
      {service.title}
    </Typography>
  );
}

ServiceHeader.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default ServiceHeader;
