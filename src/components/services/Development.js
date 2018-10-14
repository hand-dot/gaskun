import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Development() {
  return (
    <main style={{ textAlign: 'center' }}>
      <Typography variant="headline" style={{ marginBottom: '2rem' }}>
        ただいま開発中
        <span role="img" aria-label="under construction">👷</span>
      </Typography>
      <Link to="/">
        <Typography>
         Topに戻る
        </Typography>
      </Link>
    </main>
  );
}

Development.propTypes = {
};

export default Development;
