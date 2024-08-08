import { useEffect, useState, useCallback } from 'react';

// redux hooks
import { useArticles, useApp } from '../redux/hooks';

// utils
import { CATEGORIES } from '../utils/navigationItems';
import { DEFAULT_FILTERS } from '../utils/staticConstants';

const useCategoryPages = (categoryIndex = 1) => {
  const {
    loadTopArticlesByCategory,
    setFilter,
    isValidFilter,
    filter,
    currentPage,
  } = useArticles();
  const { country } = useApp();

  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (isValidFilter) {
      loadTopArticlesByCategory({
        category: CATEGORIES[categoryIndex].code,
        pagination: { currentPage },
        otherFilters: { country, ...filter },
      });
    } else if (!firstRender) {
      setFilter(DEFAULT_FILTERS);
      setFirstRender(true);
      loadTopArticlesByCategory({
        category: CATEGORIES[categoryIndex].code,
        otherFilters: { country },
      });
    }
  }, [
    loadTopArticlesByCategory,
    isValidFilter,
    filter,
    firstRender,
    currentPage,
    country,
    categoryIndex,
  ]);

  const handleLoadMore = useCallback(
    newCurrentPage => {
      if (isValidFilter) {
        loadTopArticlesByCategory({
          category: CATEGORIES[categoryIndex].code,
          pagination: { currentPage: newCurrentPage },
          otherFilters: { country, ...filter },
        });
      } else {
        loadTopArticlesByCategory({
          category: CATEGORIES[categoryIndex].code,
          pagination: { currentPage: newCurrentPage },
          otherFilters: { country },
        });
      }
    },
    [isValidFilter, loadTopArticlesByCategory, country, filter, categoryIndex]
  );

  return {
    loadMore: handleLoadMore,
  };
};

export default useCategoryPages;
