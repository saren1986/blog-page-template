import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import PropTypes from 'prop-types';
import SocialShare from '../../SocialShare/SocialShare';

const useStyles = makeStyles({
  wrapper: {
    marginBottom: 20,
  },
  leftActions: {
    textAlign: 'left',
  },
  rightActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardHeader: {
    textAlign: 'right',
  },
});

const ArticleTile = ({
  id, title, shortDescription, slug, imgUrl, rate, createdAt,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader
          subheader={createdAt}
          title={rate}
          classes={{
            root: classes.cardHeader,
          }}
        />
        <Link href="/articles/[id]" as={`/articles/${slug}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="img"
              height="300"
              image={imgUrl || 'https://via.placeholder.com/912'}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {shortDescription}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions disableSpacing>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.leftActions}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <SocialShare url={`/articles/${slug}`} />
            </Grid>
            <Grid item xs={6} className={classes.rightActions}>
              <Link href="/articles/[id]" as={`/articles/${slug}`}>
                <a>
                  <Button size="small" color="primary">
                    Read more
                  </Button>
                </a>
              </Link>
            </Grid>
          </Grid>

        </CardActions>
      </Card>
    </div>
  );
};

ArticleTile.defaultProps = {

};

ArticleTile.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ArticleTile;
