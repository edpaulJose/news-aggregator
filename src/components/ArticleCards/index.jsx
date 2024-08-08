import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper,
  Box,
  CircularProgress,
  Typography,
  Divider,
} from '@mui/material';

// utils
import {
  isEmptyArray,
  capitalizeFirstLetters,
  isEqualIgnoreCase,
} from '../../utils/staticFunctions';
import { CATEGORIES } from '../../utils/navigationItems';

// redux hooks
import { useArticles, useApp } from '../../redux/hooks';

import './index.css';
import NoItemsToShow from '../../pages/NoItemsToShow';

const LazyArticleCard = lazy(() => import('../ArticleCard'));

const ArticleCards = ({ id, loadMoreArticles, title = 'Title' }) => {
  const { pathname } = useLocation();
  const { isLoading } = useApp();
  const { articles, currentPage, fetchingData, filter } = useArticles();
  const [visibleArticles, setVisibleArticles] = useState([]);

  const observer = useRef();
  const titleContainerRef = useRef();

  const lastArticleRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        setTimeout(() => {
          if (
            !fetchingData &&
            !isEmptyArray(articles) &&
            entries[0].isIntersecting &&
            loadMoreArticles
          ) {
            loadMoreArticles(currentPage + 1);
          }
        }, 0);
      });
      if (node) observer.current.observe(node);
    },
    [currentPage, loadMoreArticles, articles, fetchingData]
  );

  useEffect(() => {
    if (currentPage === 1) {
      // This indicates that theres a change in filter
      setVisibleArticles(articles);
      titleContainerRef.current?.scrollIntoView();
      // if (isValidFilter) {
      //   if (observer.current) {
      //     observer.current.disconnect();
      //     observer.current = null;
      //   }
      // }
    } else if (currentPage > 1) {
      setVisibleArticles(prevArticles => [...prevArticles, ...articles]);
    }
  }, [currentPage, articles]);

  const displayTitle = useMemo(() => {
    const mainPageLink = CATEGORIES[0].link;
    if (isEmptyArray(articles)) {
      return '';
    } else if (
      isEqualIgnoreCase(pathname, mainPageLink) ||
      isEqualIgnoreCase(pathname, '/')
    ) {
      return filter?.q || title;
    } else {
      return `${title}${filter?.q ? ` - ${filter?.q}` : ''}`;
    }
  }, [filter, title, pathname, articles]);

  const renderArticle = useCallback(
    (article, isLastArticle, index) => {
      return (
        <Suspense fallback={<CircularProgress />}>
          <LazyArticleCard
            id={`articleCards-${index}`}
            {...(isLastArticle && { ref: lastArticleRef })}
            article={article}
          />
          {!isLastArticle && <Divider sx={{ margin: '0px 16px' }} />}
        </Suspense>
      );
    },
    [lastArticleRef]
  );

  return (
    <Box id={id} className="article-cards">
      {!isLoading && isEmptyArray(articles) ? (
        <NoItemsToShow />
      ) : (
        <>
          <Box ref={titleContainerRef} sx={{ margin: '16px 0px' }}>
            <Typography variant="h5">
              {capitalizeFirstLetters(displayTitle)}
            </Typography>
          </Box>
          <Paper>
            {visibleArticles.map((article, index) => (
              <Box key={`key-${index}`}>
                {renderArticle(
                  article,
                  visibleArticles.length === index + 1,
                  index
                )}
              </Box>
            ))}
            {visibleArticles.length > 0 && fetchingData && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '16px',
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

ArticleCards.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  loadMoreArticles: PropTypes.func,
};

export default ArticleCards;
