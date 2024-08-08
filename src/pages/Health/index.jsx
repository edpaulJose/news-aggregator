import React from 'react';
import { Box } from '@mui/material';

// hooks
import { useCategoryPages } from '../../hooks';

// custom components
import ArticleCards from '../../components/ArticleCards';

const Health = () => {
  const { loadMore } = useCategoryPages(4);

  return (
    <Box>
      <ArticleCards
        id="Health-ArticleCards"
        loadMoreArticles={loadMore}
        title="Health"
      />
    </Box>
  );
};

export default Health;
