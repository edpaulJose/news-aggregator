import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useArticles } from '../../redux/hooks/useArticles';

import './index.css';
import {
  isEmptyArray,
  capitalizeFirstLetters,
} from '../../utils/staticFunctions';

const LazyArticleCard = lazy(() => import('../ArticleCard'));

const ArticleCards = ({ id, loadMoreArticles, title = 'Title' }) => {
  const { articles, currentPage, fetchingData, isValidFilter, filter } =
    useArticles();
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
    [currentPage, loadMoreArticles, articles]
  );

  useEffect(() => {
    if (currentPage === 1) {
      // This indicates that theres a change in filter
      setVisibleArticles(articles);
      titleContainerRef.current.scrollIntoView();
      if (isValidFilter) {
        if (observer.current) {
          observer.current.disconnect();
          observer.current = null;
        }
      }
    } else if (currentPage > 1) {
      setVisibleArticles(prevArticles => [...prevArticles, ...articles]);
    }
  }, [currentPage, articles]);

  const displayTitle = useMemo(() => filter?.q || title, [filter, title]);

  return (
    <Box id={id} className="article-cards">
      <Box ref={titleContainerRef} sx={{ margin: '16px 0px' }}>
        <Typography variant="h5">
          {capitalizeFirstLetters(displayTitle)}
        </Typography>
      </Box>
      {visibleArticles.map((article, index) => {
        if (visibleArticles.length === index + 1) {
          return (
            <Suspense fallback={<CircularProgress />} key={`key-${index}`}>
              <LazyArticleCard ref={lastArticleRef} article={article} />
            </Suspense>
          );
        } else {
          return (
            <Suspense fallback={<CircularProgress />} key={`key-${index}`}>
              <LazyArticleCard article={article} />
            </Suspense>
          );
        }
      })}
      {visibleArticles.length > 0 && fetchingData && (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
          <CircularProgress />
        </Box>
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
