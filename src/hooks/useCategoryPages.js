import { useEffect, useState, useCallback } from 'react';

// redux hooks
import { useArticles, useApp } from '../redux/hooks';

// utils
import { CATEGORIES } from '../utils/navigationItems';
import { DEFAULT_FILTERS } from '../utils/staticConstants';

const useCategoryPages = (categoryIndex = 1) => {
  const { country } = useApp();
  const {
    loadTopArticlesByCategory,
    setFilter,
    isValidFilter,
    filter,
    currentPage,
  } = useArticles();

  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (isValidFilter) {
      loadTopArticlesByCategory({
        category: CATEGORIES[categoryIndex].code,
        pagination: { currentPage },
        otherFilters: { ...filter, country },
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
    categoryIndex,
    setFilter,
    country,
  ]);

  const handleLoadMore = useCallback(
    newCurrentPage => {
      if (isValidFilter) {
        loadTopArticlesByCategory({
          category: CATEGORIES[categoryIndex].code,
          pagination: { currentPage: newCurrentPage },
          otherFilters: { ...filter, country },
        });
      } else {
        loadTopArticlesByCategory({
          category: CATEGORIES[categoryIndex].code,
          pagination: { currentPage: newCurrentPage },
          otherFilters: { country },
        });
      }
    },
    [isValidFilter, loadTopArticlesByCategory, filter, categoryIndex, country]
  );

  return {
    loadMore: handleLoadMore,
  };
};

export default useCategoryPages;
