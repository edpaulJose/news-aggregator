import { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// utils
import { timeAgo } from '../../utils/dateFunctions';

import './index.css';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ArticleCard = forwardRef(({ id, article }, ref) => {
  const isImagePresent = useMemo(
    () => article.urlToImage,
    [article.urlToImage]
  );

  return (
    <Card id={id} ref={ref} elevation={0} className="article-card-container">
      <Grid container>
        <Grid item xs={isImagePresent ? 5 : 12}>
          <CardContent>
            {isImagePresent ? (
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage}
                alt={article.title}
                sx={{ width: 140, borderRadius: '16px' }}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <img
                  src={`https://logo.clearbit.com/${new URL(article.url).hostname}`}
                  alt={article.source.name}
                  style={{ height: 20, width: 20, marginRight: 8 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {article.source.name}
                </Typography>
              </Box>
            )}
            <Typography variant="h6">
              <StyledLink
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {article.title}
              </StyledLink>
            </Typography>
            <Box
              className="time-author"
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '16px',
              }}
            >
              <Typography variant="body1">
                {timeAgo(article.publishedAt)}
              </Typography>
              <FiberManualRecordIcon fontSize="small" sx={{ padding: '6px' }} />
              <Typography variant="body1">{article.author}</Typography>
            </Box>
          </CardContent>
        </Grid>
        {isImagePresent && (
          <Grid item xs={7}>
            <Box>
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
              <CardContent>
                <Typography variant="body1">
                  <StyledLink
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {article.description}
                  </StyledLink>
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
});

ArticleCard.propTypes = {
  id: PropTypes.string.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticleCard;
