export const DEFAULT_SEARCH_LIMIT = 10;

export const DEFAULT_SORT = 'asc';

export const SEARCH_LIMITS = [10, 20, 50];

export const DEFAULT_FILTERS = {
  country: null,
  q: null,
  sources: null,
  date: null,
}

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
    dateTo: null,
    dateFrom: null
  },
  {
    code: 'pastHour',
    label: 'Past Hour',
    dateTo: new Date().toISOString(),
    dateFrom: new Date(Date.now() - 60 * 60 * 1000).toISOString() // 1 hour ago
  },
  {
    code: 'past24Hours',
    label: 'Past 24 Hours',
    dateTo: new Date().toISOString(),
    dateFrom: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 24 hours ago
  },
  {
    code: 'pastWeek',
    label: 'Past Week',
    dateTo: new Date().toISOString(),
    dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    code: 'pastYear',
    label: 'Past Year',
    dateTo: new Date().toISOString(),
    dateFrom: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString() // 365 days ago
  }
];

export const CATEGORIES = [
  { code: 'business', label: 'Business', link: '/business' },
  { code: 'entertainment', label: 'Entertainment', link: '/entertainment' },
  { code: 'general', label: 'General', link: '/general' },
  { code: 'health', label: 'Health', link: '/health' },
  { code: 'science', label: 'Science', link: '/science' },
  { code: 'sports', label: 'Sports', link: '/sports' },
  { code: 'technology', label: 'Technology', link: '/technology' }
];