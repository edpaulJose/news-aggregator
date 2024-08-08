import {
  setArticles,
  setCurrentPage,
  setLimit,
  setFetchingData,
  setSources,
  setError,
} from '../slices/articlesSlice';
import { setLoading } from '../slices/appSlice';
import {
  fetchArticles,
  fetchTopArticles,
  fetchAllSources,
  fetchAllArticlesByCategory,
} from '../../api/newsApi';

const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY;

export const loadTopArticles =
  ({ currentPage, limit }, noLoading, country = DEFAULT_COUNTRY) =>
  async dispatch => {
    if (!noLoading) dispatch(setLoading(true));
    dispatch(setFetchingData(true));
    const { articles, totalPages, pagination, error } = await fetchTopArticles(
      { currentPage, limit },
      country
    );
    if (!error) {
      dispatch(setArticles({ articles, totalPages }));
      dispatch(setCurrentPage(pagination?.currentPage));
      dispatch(setLimit(pagination?.limit));
      dispatch(setError(null));
    } else {
      dispatch(setError(error));
    }

    if (!noLoading) dispatch(setLoading(false));
    dispatch(setFetchingData(false));
  };

export const loadArticles =
  ({ filter, pagination, noLoading = false, country = DEFAULT_COUNTRY }) =>
  async dispatch => {
    if (!noLoading) dispatch(setLoading(true));
    dispatch(setFetchingData(true));
    // const { pagination } = getState();
    let response = {};
    if (filter) {
      response = await fetchArticles({ ...filter, country }, pagination);
    } else {
      response = await fetchTopArticles(pagination, country);
    }

    if (!response?.error) {
      const { articles, totalPages, pagination } = response;
      dispatch(setArticles({ articles, totalPages }));
      dispatch(setCurrentPage(pagination?.currentPage));
      dispatch(setLimit(pagination?.limit));
      dispatch(setError(null));
    } else {
      dispatch(setError(response?.error));
    }
    if (!noLoading) dispatch(setLoading(false));
    dispatch(setFetchingData(false));
  };

export const loadTopArticlesByCategory =
  ({
    category,
    pagination,
    noLoading,
    otherFilters,
  }) =>
  async dispatch => {
    if (!noLoading) dispatch(setLoading(true));
    dispatch(setFetchingData(true));

    const response = await fetchAllArticlesByCategory(category, pagination, {
      ...otherFilters,
    });
    if (!response?.error) {
      const { articles, totalPages, pagination } = response;
      dispatch(setArticles({ articles, totalPages }));
      dispatch(setCurrentPage(pagination?.currentPage));
      dispatch(setLimit(pagination?.limit));
      dispatch(setError(null));
    } else {
      dispatch(setError(response?.error));
    }

    if (!noLoading) dispatch(setLoading(false));
    dispatch(setFetchingData(false));
  };

export const loadAllSources = filter => async dispatch => {
  dispatch(setFetchingData(true));
  const { sources, error } = await fetchAllSources(filter);

  if (!error) {
    dispatch(setSources(sources));
    dispatch(setError(null));
  } else {
    dispatch(setError(error));
  }
  dispatch(setFetchingData(false));
};

export const incrementCurrentPage = () => async (dispatch, getState) => {
  const { pagination } = getState();
  dispatch(setCurrentPage(pagination.currentPage + 1));
};
