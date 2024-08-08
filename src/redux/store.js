import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    articles: articlesReducer,
  },
});

// App
export const selectIsloading = state => state.app.isLoading;
export const selectCountry = state => state.app.country;

// Articles
export const selectArticles = state => state.articles;
export const selectCurrentPage = state => state.articles.pagination.currentPage;
export const selectTotalPages = state => state.articles.totalPages;
export const selectFetchingData = state => state.articles.fetchingData;
export const selectFilter = state => state.articles.filter;
export const selectPagination = state => state.articles.pagination;
export const selectSources = state => state.articles.sources;
export const selectError = state => state.articles.error;
