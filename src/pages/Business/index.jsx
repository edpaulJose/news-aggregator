import React from 'react';
import { Box } from '@mui/material';

// hooks
import { useCategoryPages } from '../../hooks';

// custom components
import ArticleCards from '../../components/ArticleCards';

const Business = () => {
  const { loadMore } = useCategoryPages(1);

  return (
    <Box>
      <ArticleCards
        id="Business-ArticleCards"
        loadMoreArticles={loadMore}
        title="Business"
      />
    </Box>
  );
};

export default Business;
