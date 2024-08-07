import axios from 'axios';
import { objectToQueryParams, getCountryCode } from '../utils/staticFunctions';
import { DEFAULT_SEARCH_LIMIT } from '../utils/staticConstants';
// const API_KEY = 'WrongAPIKE';
// const API_KEY = '309b3bae735a436393d7af7d92dc0aee';
const API_KEY = '1cfd4e9544f9417a90b316fa601688c3';
// const API_KEY = '9ae9cc33f8ff44358982c574cb0941c7';
const DOMAIN = 'https://newsapi.org';
const URL_EVERYTHING = `${DOMAIN}/v2/everything`;
const URL_TOP_HEADLINES = `${DOMAIN}/v2/top-headlines`;

const fetchArticles = async (
  payload,
  pagination = { currentPage: 1, limit: DEFAULT_SEARCH_LIMIT }
) => {
  try {
    let newPayload = { ...payload };
    if (newPayload.date) {
      delete newPayload.date;
      newPayload.dateTo = payload.date.dateTo;
      newPayload.dateFrom = payload.date.dateFrom;
    }

    const queryString = objectToQueryParams({
      ...newPayload,
      page: pagination?.currentPage || 1,
      pageSize: pagination.limit || DEFAULT_SEARCH_LIMIT,
      apiKey: API_KEY,
    });
    const response = await axios.get(`${URL_EVERYTHING}?${queryString}`);

    const data = response.data;

    return {
      articles: data?.articles || [],
      totalPages: Math.ceil(data?.totalResults / pagination.limit),
      pagination,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

const fetchTopArticles = async (
  pagination = { currentPage: 1, limit: DEFAULT_SEARCH_LIMIT },
  country
) => {
  try {
    const queryString = objectToQueryParams({
      country: country || getCountryCode(),
      page: pagination?.currentPage || 1,
      pageSize: pagination?.limit || DEFAULT_SEARCH_LIMIT,
      apiKey: API_KEY,
    });
    const response = await axios.get(`${URL_TOP_HEADLINES}?${queryString}`);

    const data = response.data;
    return {
      articles: data?.articles,
      totalPages: Math.ceil(data?.totalResults / pagination.limit),
      pagination,
    };
  } catch (error) {
    return { error };
  }
};

// const fetchAllArticlesByCategory =

const fetchAllSources = async (filter = {}) => {
  try {
    const response = await axios.get(`${DOMAIN}/v2/sources`, {
      params: {
        ...filter,
        apiKey: API_KEY,
      },
    });

    return {
      sources: response.data?.sources || [],
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export { fetchArticles, fetchTopArticles, fetchAllSources };
