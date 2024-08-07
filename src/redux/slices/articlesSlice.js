import { createSlice } from '@reduxjs/toolkit';
import {
  DEFAULT_SEARCH_LIMIT,
  DEFAULT_FILTERS,
} from '../../utils/staticConstants';

const INITIAL_STATE = {
  articles: [],
  filter: DEFAULT_FILTERS,
  // filter: null,
  pagination: {
    currentPage: 1,
    limit: DEFAULT_SEARCH_LIMIT,
  },
  totalPages: 1,
  fetchingData: false,
  sources: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState: INITIAL_STATE,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload.articles;
      state.totalPages = action.payload.totalPages;
    },
    setPage(state, action) {
      state.pagination.currentPage = action.payload || 1;
    },
    setLimit(state, action) {
      state.pagination.limit = action.payload || INITIAL_STATE.limit;
    },
    setFilter(state, action) {
      state.filter = action.payload || INITIAL_STATE.filter;
    },
    addFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    setFetchingData(state, action) {
      state.fetchingData = action.payload || false;
    },
    setSources(state, action) {
      state.sources = action.payload || [];
    },
    setFilterDate(state, action) {
      state.filter.date = action.payload || INITIAL_STATE.filter.date;
    },
  },
});

export const {
  setArticles,
  setPage,
  setLimit,
  setFilter,
  setFetchingData,
  setSources,
  setFilterDate,
  addFilter,
} = articlesSlice.actions;
export default articlesSlice.reducer;
