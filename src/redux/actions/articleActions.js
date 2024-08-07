import {
  setArticles,
  setPage,
  setLimit,
  setFetchingData,
  setSources,
} from '../slices/articlesSlice';
import { setLoading } from '../slices/appSlice';
import {
  fetchArticles,
  fetchTopArticles,
  fetchAllSources,
} from '../../api/newsApi';

export const loadTopArticles =
  ({ currentPage, limit }, noLoading, country) =>
  async dispatch => {
    if (!noLoading) dispatch(setLoading(true));
    dispatch(setFetchingData(true));
    const { articles, totalPages, pagination, error } = await fetchTopArticles(
      { currentPage, limit },
      country
    );
    if (!error) {
      dispatch(setArticles({ articles, totalPages }));
      dispatch(setPage(pagination?.currentPage));
      dispatch(setLimit(pagination?.limit));
    }

    if (!noLoading) dispatch(setLoading(false));
    dispatch(setFetchingData(false));
  };

export const loadArticles =
  ({ filter, pagination, noLoading = false }) =>
  async dispatch => {
    if (!noLoading) dispatch(setLoading(true));
    dispatch(setFetchingData(true));
    // const { pagination } = getState();
    let response = {};
    if (filter) {
      response = await fetchArticles(filter, pagination);
    } else {
      response = await fetchTopArticles(pagination);
    }

    if (!response?.error) {
      const { articles, totalPages, pagination } = response;
      dispatch(setArticles({ articles, totalPages }));
      dispatch(setPage(pagination?.currentPage));
      dispatch(setLimit(pagination?.limit));
    }
    if (!noLoading) dispatch(setLoading(false));
    dispatch(setFetchingData(false));
  };

// export const loadArticlesWithFilter =
//   (pagination) =>
//   async (dispatch, getState) => {
//     setFetchingData(true);
//     const { filter } = getState().articles;
//     dispatch(setFilter(filter));
//     const { articles, error, totalPages } = await fetchArticles(
//       filter,
//       pagination
//     );
//     setFetchingData(false);
//     if (!error) {
//       dispatch(setArticles({ articles, totalPages }));
//       dispatch(setPage(pagination?.currentPage));
//       dispatch(setLimit(pagination?.limit));
//     }
//   };

export const loadAllSources = filter => async dispatch => {
  dispatch(setFetchingData(true));
  const { sources, error } = await fetchAllSources(filter);

  if (!error) {
    dispatch(setSources(sources));
  }
  dispatch(setFetchingData(false));
};

export const incrementCurrentPage = () => async (dispatch, getState) => {
  const { pagination } = getState();
  dispatch(setPage(pagination.currentPage + 1));
};
