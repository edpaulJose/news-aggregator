import { lazy } from 'react';

export const CATEGORIES = [
  {
    code: 'business',
    label: 'Business',
    link: '/business',
    component: lazy(() => import('../pages/Business')),
  },
  {
    code: 'entertainment',
    label: 'Entertainment',
    link: '/entertainment',
    component: lazy(() => import('../pages/Entertainment')),
  },
  {
    code: 'general',
    label: 'General',
    link: '/general',
    component: lazy(() => import('../pages/General')),
  },
  {
    code: 'health',
    label: 'Health',
    link: '/health',
    component: lazy(() => import('../pages/Health')),
  },
  {
    code: 'science',
    label: 'Science',
    link: '/science',
    component: lazy(() => import('../pages/Science')),
  },
  {
    code: 'sports',
    label: 'Sports',
    link: '/sports',
    component: lazy(() => import('../pages/Sports')),
  },
  {
    code: 'technology',
    label: 'Technology',
    link: '/technology',
    component: lazy(() => import('../pages/Technology')),
  },
];
