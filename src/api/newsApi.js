import axios from 'axios';
import { objectToQueryParams } from '../utils/staticFunctions';
import { DEFAULT_SEARCH_LIMIT } from '../utils/staticConstants';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const DOMAIN = import.meta.env.VITE_NEWS_API_DOMAIN;
const URL_EVERYTHING = `${DOMAIN}/everything`;
const URL_TOP_HEADLINES = `${DOMAIN}/top-headlines`;
const COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY;

const extractPagination = paginationFromApp => ({
  page: paginationFromApp.currentPage || 1,
  pageSize: paginationFromApp.limit || DEFAULT_SEARCH_LIMIT,
});

const getTotalPages = (totalResults = 1, limit = DEFAULT_SEARCH_LIMIT) =>
  Math.ceil(totalResults / limit);

const fetchArticles = async (
  payload,
  pagination = { currentPage: 1, limit: DEFAULT_SEARCH_LIMIT }
) => {
  try {
    // alter filters for date to and from params
    let newPayload = { ...payload };
    if (newPayload.date) {
      delete newPayload.date;
      newPayload.to = payload.date.to;
      newPayload.from = payload.date.from;
    }
    // TODO: country is not supported for everything enpoint
    if(newPayload.country) {
      delete newPayload.country;
    }

    const queryString = objectToQueryParams({
      ...newPayload,
      sortBy: 'publishedAt',
      ...extractPagination(pagination),
      apiKey: API_KEY,
    });
    const response = await axios.get(`${URL_EVERYTHING}?${queryString}`);

    const data = response.data;

    return {
      articles: data?.articles || [],
      totalPages: getTotalPages(data?.totalResults, pagination.limit),
      pagination,
    };
  } catch (error) {
    return {
      error: error?.response?.data || error || 'System Error',
    };
  }
};

const fetchTopArticles = async (
  pagination = { currentPage: 1, limit: DEFAULT_SEARCH_LIMIT },
  country
) => {
  try {
    const queryString = objectToQueryParams({
      country: country || COUNTRY,
      ...extractPagination(pagination),
      apiKey: API_KEY,
    });
    const response = await axios.get(`${URL_TOP_HEADLINES}?${queryString}`);

    const data = response.data;
    return {
      articles: data?.articles,
      totalPages: getTotalPages(data?.totalResults, pagination.limit),
      pagination,
    };
  } catch (error) {
    return {
      error: error?.response?.data || error || 'System Error',
    };
  }
};

export const fetchAllArticlesByCategory = async (
  category,
  pagination = { currentPage: 1, limit: DEFAULT_SEARCH_LIMIT },
  otherFilters = {}
) => {
  try {
    // alter filters for date to and from params
    let newOtherFilters = { ...otherFilters };
    if (newOtherFilters.date) {
      delete newOtherFilters.date;
      newOtherFilters.to = otherFilters.date.to;
      newOtherFilters.from = otherFilters.date.from;
    }

    const response = await axios.get(`${URL_TOP_HEADLINES}`, {
      params: {
        ...newOtherFilters,
        ...extractPagination(pagination),
        category,
        apiKey: API_KEY,
      },
    });
    const data = response.data;
    return {
      articles: data?.articles,
      totalPages: getTotalPages(data?.totalResults, pagination?.limit),
      pagination,
    };
  } catch (error) {
    return {
      error: error?.response?.data || error || 'System Error',
    };
  }
};

const fetchAllSources = async (filter = {}) => {
  try {
    const response = await axios.get(`${DOMAIN}/sources`, {
      params: {
        ...filter,
        apiKey: API_KEY,
      },
    });

    return {
      sources: response.data?.sources || [],
    };
  } catch (error) {
    return {
      error: error?.response?.data || error || 'System Error',
    };
  }
};

export { fetchArticles, fetchTopArticles, fetchAllSources };
