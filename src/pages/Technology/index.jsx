import { Box } from '@mui/material';

// hooks
import { useCategoryPages } from '../../hooks';

// custom components
import ArticleCards from '../../components/ArticleCards';

const Technology = () => {
  const { loadMore } = useCategoryPages(7);

  return (
    <Box>
      <ArticleCards
        id="Technology-ArticleCards"
        loadMoreArticles={loadMore}
        title="Technology"
      />
    </Box>
  );
};

export default Technology;
