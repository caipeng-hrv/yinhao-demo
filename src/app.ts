import express from 'express';
import bodyParser from 'body-parser';
import Shopify, { ApiVersion } from '@shopify/shopify-api';
import dotenv from 'dotenv';
import { routes } from './routes';

export const app = express();

dotenv.config({ path: './.env' });

const { API_KEY, API_SECRET_KEY, SCOPES, HOST } = process.env;
Shopify.Context.initialize({
  API_KEY: API_KEY!,
  API_SECRET_KEY: API_SECRET_KEY!,
  SCOPES: SCOPES?.split(',')!,
  HOST_NAME: HOST!.replace(/https?:\/\//, ''),
  HOST_SCHEME: HOST!.split('://')[0],
  IS_EMBEDDED_APP: false,
  API_VERSION: ApiVersion.April22
});

app.use(bodyParser.urlencoded({ extended: false }));

routes.forEach((route) => {
  const { method, path, middleware, handler } = route;
  app[method](path, ...middleware, handler);
});
