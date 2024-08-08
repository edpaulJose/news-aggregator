export const DEFAULT_SEARCH_LIMIT = 10;

export const DEFAULT_SORT = 'asc';

export const SEARCH_LIMITS = [10, 20, 50];

export const DEFAULT_FILTERS = {
  country: null,
  q: null,
  sources: null,
  date: null,
};

export const DEFAULT_PAGINATION = {
  currentPage: 1,
  limit: DEFAULT_SEARCH_LIMIT,
};

export const COUNTRY_CODES = [
  'ae',
  'ar',
  'at',
  'au',
  'be',
  'bg',
  'br',
  'ca',
  'ch',
  'cn',
  'co',
  'cz',
  'de',
  'eg',
  'fr',
  'gb',
  'gr',
  'hk',
  'hu',
  'id',
  'ie',
  'il',
  'in',
  'it',
  'jp',
  'kr',
  'lt',
  'lv',
  'ma',
  'mx',
  'my',
  'ng',
  'nl',
  'no',
  'nz',
  'ph',
  'pl',
  'pt',
  'ro',
  'rs',
  'ru',
  'sa',
  'se',
  'sg',
  'si',
  'sk',
  'th',
  'tr',
  'tw',
  'ua',
  'us',
  've',
  'za',
];

export const DATE_OPTIONS = [
  {
    code: 'anytime',
    label: 'Anytime',
    to: null,
    from: null,
  },
  {
    code: 'pastHour',
    label: 'Past Hour',
    to: new Date().toISOString(),
    from: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    code: 'past24Hours',
    label: 'Past 24 Hours',
    to: new Date().toISOString(),
    from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
  },
  {
    code: 'pastWeek',
    label: 'Past Week',
    to: new Date().toISOString(),
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    code: 'pastYear',
    label: 'Past Year',
    to: new Date().toISOString(),
    from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 365 days ago
  },
];
