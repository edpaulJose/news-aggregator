import { Box } from '@mui/material';

// hooks
import { useCategoryPages } from '../../hooks';

// custom components
import ArticleCards from '../../components/ArticleCards';

const General = () => {
  const { loadMore } = useCategoryPages(3);

  return (
    <Box>
      <ArticleCards
        id="General-ArticleCards"
        loadMoreArticles={loadMore}
        title="General"
      />
    </Box>
  );
};

export default General;
