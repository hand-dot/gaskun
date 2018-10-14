import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ServiceHeader from './ServiceHeader';

function Development(props) {
  return (
    <main>
      <ServiceHeader {...props} />
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <Typography variant="h6">
        ただいま開発中...
          <span role="img" aria-label="under construction">👷</span>
        </Typography>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/">
            <Typography>
              Topに戻る
            </Typography>
          </Link>
        </div>
      </div>
    </main>
  );
}

Development.propTypes = {
};

export default Development;
