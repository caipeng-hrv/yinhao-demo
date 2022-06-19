import { Route } from './types';
import * as product from './handlers/product';
import * as auth from './handlers/auth';
import * as home from './handlers/home';

export const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    middleware: [],
    handler: home.home
  },
  {
    method: 'get',
    path: '/login',
    middleware: [],
    handler: auth.login
  },
  {
    method: 'get',
    path: '/auth/callback',
    middleware: [],
    handler: auth.callback
  },
  {
    method: 'get',
    path: '/product',
    middleware: [],
    handler: product.addProduct
  }
];
