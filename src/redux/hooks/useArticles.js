import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadArticles as loadArticlesAction,
  // loadArticlesWithFilter as loadArticlesWithFilterAction,
  loadTopArticles as loadTopArticlesAction,
  loadAllSources as loadAllSourcesAction,
  incrementCurrentPage as incrementCurrentPageAction,
} from '../actions/articleActions';
import {
  setFilter as setFilterSlice,
  setFilterDate as setFilterDateSlice,
  addFilter as addFilterSlice,
} from '../slices/articlesSlice';
import {
  selectArticles,
  selectCurrentPage,
  selectTotalPages,
  selectFetchingData,
  selectFilter,
  selectPagination,
  selectSources,
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

  // Only include valid filters to avoid unecessary values passed to api
  // const newFilter = useMemo(() => {
  //   const tempFilter = {...filter};
  //   if(!tempFilter.date.dateTo) { // dateTo is enough for checking
  //     tempFilter.date = DATE_OPTIONS
  //   }
  //   return tempFilter;
  // }, [filter]);

  const loadArticles = useCallback(
    ({ filter, pagination }) => {
      // dispatch(loadArticlesAction({ filter, pagination }));
    },
    [dispatch]
  );

  const loadTopArticles = useCallback(
    pagination => {
      // dispatch(loadTopArticlesAction(pagination));
    },
    [dispatch]
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
    () => dispatch(loadAllSourcesAction({ country: filter?.country || 'us' })),
    [dispatch, filter]
  );

  const incrementCurrentPage = useCallback(
    () => dispatch(incrementCurrentPageAction()),
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
    // loadArticlesWithFilter,
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
  };
};
