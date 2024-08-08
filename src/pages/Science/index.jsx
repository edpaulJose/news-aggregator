import { Box } from '@mui/material';

// hooks
import { useCategoryPages } from '../../hooks';

// custom components
import ArticleCards from '../../components/ArticleCards';

const Science = () => {
  const { loadMore } = useCategoryPages(5);

  return (
    <Box>
      <ArticleCards
        id="Science-ArticleCards"
        loadMoreArticles={loadMore}
        title="Science"
      />
    </Box>
  );
};

export default Science;
