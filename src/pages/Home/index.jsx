import { useEffect, useCallback } from 'react';
import { Box } from '@mui/material';

// componets
import ArticleCards from '../../components/ArticleCards';
// redux
import { useArticles } from '../../redux/hooks/useArticles';

const Home = () => {
  const { loadArticles, filter, isValidFilter } = useArticles();

  const fetchArticles = useCallback(
    (newCurrentPage, noLoading) => {
      if (isValidFilter) {
        loadArticles({
          filter,
          pagination: { currentPage: newCurrentPage || 1 },
          noLoading,
        });
      } else {
        loadArticles({
          pagination: { currentPage: newCurrentPage },
          noLoading,
        });
      }
    },
    [filter, loadArticles, isValidFilter]
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
