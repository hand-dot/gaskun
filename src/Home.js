import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
});

const devImg = icon => `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3E${icon}${icon}${icon}${icon}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`; // eslint-disable-line max-len

const services = [
  {
    icon: '🌀', id: 'unit-converter', title: '単位変換',
  },
  {
    icon: '💧', id: 'production-calc', title: '製造量計算',
  },
  {
    icon: '🚰', id: 'storage-calc', title: '貯蔵量計算',
  },
  {
    icon: '💬', id: 'qa', title: 'Q&A',
  },
  {
    icon: '🚛', id: 'maxflowrate-calc', title: '各配管ガスの最大流量計算',
  },
  {
    icon: '👿', id: 'pressureloss-calc', title: '各配管の圧力損失計算',
  }, {
    icon: '🎭', id: 'reducingvalve-calc', title: '減圧弁の流量換算',
  },
  {
    icon: '💫', id: 'purgegas-estimation', title: 'パージガス量の簡易推算法',
  },
];

function Home(props) {
  const { classes } = props;
  return (
    <main>
      <Grid container spacing={40}>
        {services.map(service => (
          <Grid key={service.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/${service.id}`} style={{ textDecoration: 'none' }}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={(
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      {service.icon}
                    </Avatar>
                  )}
                  title={service.title}
                />
                <CardMedia
                  className={classes.cardMedia}
                  image={devImg(service.icon)}
                  title={service.title}
                />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(Home);
