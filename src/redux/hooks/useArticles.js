import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadArticles as loadArticlesAction,
  loadTopArticlesByCategory as loadTopArticlesByCategoryAction,
  loadTopArticles as loadTopArticlesAction,
  loadAllSources as loadAllSourcesAction,
  incrementCurrentPage as incrementCurrentPageAction,
} from '../actions/articleActions';
import {
  setFilter as setFilterSlice,
  setFilterDate as setFilterDateSlice,
  addFilter as addFilterSlice,
  setCurrentPage as setCurrentPageSlice,
} from '../slices/articlesSlice';
import {
  selectArticles,
  selectCurrentPage,
  selectTotalPages,
  selectFetchingData,
  selectFilter,
  selectPagination,
  selectSources,
  selectCountry,
  selectError,
} from '../store';

import { isEmptyOrNilArray } from '../../utils/staticFunctions';

export const useArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles).articles;
  const fetchingData = useSelector(selectFetchingData);
  const filter = useSelector(selectFilter);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const pagination = useSelector(selectPagination);
  const sources = useSelector(selectSources);
  const country = useSelector(selectCountry);
  const error = useSelector(selectError);

  const loadArticles = useCallback(
    ({ filter, pagination }) => {
      dispatch(loadArticlesAction({ filter, pagination, country }));
    },
    [dispatch, country]
  );

  const loadTopArticles = useCallback(
    pagination => {
      dispatch(loadTopArticlesAction(pagination, false, country));
    },
    [dispatch, country]
  );

  const loadTopArticlesByCategory = useCallback(
    ({ category, pagination, noLoading, otherFilters }) => {
      dispatch(
        loadTopArticlesByCategoryAction({
          category,
          pagination,
          noLoading,
          otherFilters,
          country,
        })
      );
    },
    [dispatch, country]
  );

  const setFilter = useCallback(
    newFilter => dispatch(setFilterSlice(newFilter)),
    [dispatch]
  );

  const addFilter = useCallback(
    newFilter => dispatch(addFilterSlice(newFilter)),
    [dispatch]
  );

  const loadAllSources = useCallback(
    () => dispatch(loadAllSourcesAction()),
    [dispatch, filter]
  );

  const incrementCurrentPage = useCallback(
    () => dispatch(incrementCurrentPageAction()),
    [dispatch]
  );

  const setCurrentPage = useCallback(
    currentPage => {
      dispatch(setCurrentPageSlice(currentPage));
    },
    [dispatch]
  );

  const setFilterDate = useCallback(
    dateFilter => {
      dispatch(setFilterDateSlice(dateFilter));
    },
    [dispatch]
  );

  const isValidFilter = useMemo(
    () => filter?.q || !isEmptyOrNilArray(filter?.sources),
    [filter]
  );

  return {
    articles,
    filter,
    currentPage,
    totalPages,
    loadTopArticlesByCategory,
    loadArticles,
    loadTopArticles,
    fetchingData,
    setFilter,
    pagination,
    sources,
    loadAllSources,
    incrementCurrentPage,
    isValidFilter,
    setFilterDate,
    addFilter,
    setCurrentPage,
    error,
  };
};
