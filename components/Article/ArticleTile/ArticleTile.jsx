import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import UiLink from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { CommentCount } from 'disqus-react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactMarkdown from 'react-markdown';
import Divider from '@material-ui/core/Divider';
import LikeSection from '../../LikeSection/LikeSection';
import paths from '../../../src/paths';
import SocialShare from '../../SocialShare/SocialShare';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: 20,
  },
  leftActions: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    order: 2,
  },
  subheader: {
    order: 1,
  },
  comments: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
    marginLeft: 10,
    color: theme.palette.text.primary,
  },
  chatIcon: {
    marginRight: 10,
  },
  seeMore: {
    '&:hover': {
      background: 'none',
    },
  },
  content: {
    '& .twitter-tweet.twitter-tweet-rendered': {
      margin: '20px auto',
    },
    '& blockquote': {
      fontStyle: 'italic',
    },
  },
  divider: {
    margin: '10px 0',
  },
  disqusWrapper: {
    margin: '10px 0',
    '& .striped-bar': {
      display: 'none',
    },
  },
  videoResponsive: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: '0',
    '& iframe': {
      left: '0',
      top: '0',
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
  },
  media: {
    minHeight: 320,
  },
  sources: {
    '& a': {
      display: 'block',
      textDecoration: 'none',
      margin: '10px 0',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
}));

const ArticleTile = ({
  fullInfo, id, title, shortDescription, slug, thumbnail, createdAt, content, video, sources,
}) => {
  const classes = useStyles();
  const upXs = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const disqusConfig = {
    url: `${paths.root + paths.articles}/${slug}#disqus_thread`,
    identifier: id,
    title,
  };
  const cardMedia = video ? (
    <div className={classes.videoResponsive}>
      <CardMedia
        component="iframe"
        src={video.url}
        height={video.height}
        width={video.width}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  ) : (
    <div className={classes.media}>
      <CardMedia
        component="img"
        alt={thumbnail[0].title || title}
        title={thumbnail[0].title || title}
        src={thumbnail[0].url}
      />
    </div>
  );
  const cardContent = (
    <>
      {cardMedia}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div" className={classes.content}>
          <ReactMarkdown escapeHtml={false} source={fullInfo ? content : shortDescription} />
        </Typography>
        {fullInfo && sources ? (
          <>
            <Divider className={classes.divider} />
            <Typography gutterBottom variant="h5" component="h4">
              Sources:
            </Typography>
            <div className={classes.sources}>
              <ReactMarkdown escapeHtml={false} source={sources} />
            </div>
          </>
        ) : null}
      </CardContent>
    </>
  );
  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader
          subheader={createdAt}
          title="#category"
          classes={{
            content: classes.cardHeader,
            title: classes.title,
            subheader: classes.subheader,
          }}
        />
        {fullInfo ? cardContent : (
          <Link href={`${paths.articles}/[slug]`} as={`${paths.articles}/${slug}`}>
            <CardActionArea>
              {cardContent}
            </CardActionArea>
          </Link>
        )}
        <CardActions disableSpacing>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className={classes.leftActions}>
                <SocialShare url={`${paths.root + paths.articles}/${slug}`} />
                <LikeSection articleId={id} />
                <Link href={`${paths.articles}/[slug]`} as={`${paths.articles}/${slug}#disqus_thread`}>
                  <UiLink className={classes.comments}>
                    <ChatBubbleOutlineIcon className={classes.chatIcon} />
                    <CommentCount
                      shortname={process.env.NEXT_PUBLIC_DISQUS_SHORT_NAME}
                      config={disqusConfig}
                    />
                  </UiLink>
                </Link>
              </div>
            </Grid>
            <Grid item xs={4} className={classes.rightActions}>
              {fullInfo ? null : (
                <Link href={`${paths.articles}/[slug]`} as={`${paths.articles}/${slug}`}>
                  <UiLink>
                    <Button
                      size="small"
                      color="primary"
                      classes={{
                        root: classes.seeMore,
                      }}
                    >
                      {upXs ? 'See more' : 'See'}
                    </Button>
                  </UiLink>
                </Link>
              ) }
            </Grid>
          </Grid>

        </CardActions>
      </Card>
    </div>
  );
};
ArticleTile.defaultProps = {
  fullInfo: false,
  shortDescription: '',
  content: '',
  video: '',
  sources: '',

};
ArticleTile.propTypes = {
  id: PropTypes.string.isRequired,
  fullInfo: PropTypes.bool,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.arrayOf(
    PropTypes.shape(
      {
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
        height: PropTypes.number,
      },
    ),
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string,
  video: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  sources: PropTypes.string,
};

export default ArticleTile;
