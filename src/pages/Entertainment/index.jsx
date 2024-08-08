import React from 'react';
import { Box } from '@mui/material';

// hooks
import { useCategoryPages } from '../../hooks';

// custom components
import ArticleCards from '../../components/ArticleCards';

const Entertainment = () => {
  const { loadMore } = useCategoryPages(2);

  return (
    <Box>
      <ArticleCards
        id="Entertainment-ArticleCards"
        loadMoreArticles={loadMore}
        title="Entertainment"
      />
    </Box>
  );
};

export default Entertainment;
