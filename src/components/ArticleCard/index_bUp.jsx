import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Grid,
} from '@mui/material';
import { Link } from '@mui/material';

const ArticleCard = forwardRef(({ article }, ref) => {
  return (
    <Card ref={ref} sx={{ margin: 'auto', boxShadow: 3 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
      </CardContent>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        {article.urlToImage && (
          <Grid item>
            <CardMedia
              component="img"
              height="140"
              image={article.urlToImage}
              alt={article.title}
              sx={{ width: 140 }}
            />
          </Grid>
        )}
        <Grid item xs>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {article.description}
            </Typography>
            <CardActions>
              <Button size="small" color="primary">
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                >
                  Read More
                </Link>
              </Button>
            </CardActions>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`https://logo.clearbit.com/${new URL(article.url).hostname}`}
                alt={article.source.name}
                style={{ height: 20, width: 20, marginRight: 8 }}
              />
              <Typography variant="caption" color="text.secondary">
                {article.source.name}
              </Typography>
            </CardContent>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
});

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticleCard;
