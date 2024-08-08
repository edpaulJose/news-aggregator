import { useEffect, useCallback } from 'react';
import { Box } from '@mui/material';

// componets
import ArticleCards from '../../components/ArticleCards';
// redux
import { useArticles } from '../../redux/hooks/useArticles';
import { useApp } from '../../redux/hooks';

const Home = () => {
  const { country } = useApp();
  const { loadArticles, filter, isValidFilter } = useArticles();

  const fetchArticles = useCallback(
    (newCurrentPage, noLoading) => {
      if (isValidFilter) {
        loadArticles({
          filter,
          pagination: { currentPage: newCurrentPage || 1 },
          noLoading,
          country
        });
      } else {
        loadArticles({
          pagination: { currentPage: newCurrentPage },
          noLoading,
          country
        });
      }
    },
    [filter, loadArticles, isValidFilter, country]
  );

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleLoadMore = useCallback(
    newCurrentPage => {
      fetchArticles(newCurrentPage, true);
    },
    [fetchArticles]
  );

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <ArticleCards
        id="Home-ArticleCards"
        loadMoreArticles={handleLoadMore}
        title="Headline"
      />
    </Box>
  );
};

export default Home;
