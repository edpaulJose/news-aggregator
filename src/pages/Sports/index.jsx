import { Box } from '@mui/material';

// hooks
import { useCategoryPages } from '../../hooks';

// custom components
import ArticleCards from '../../components/ArticleCards';

const Sports = () => {
  const { loadMore } = useCategoryPages(6);

  return (
    <Box>
      <ArticleCards
        id="Sports-ArticleCards"
        loadMoreArticles={loadMore}
        title="Sports"
      />
    </Box>
  );
};

export default Sports;
