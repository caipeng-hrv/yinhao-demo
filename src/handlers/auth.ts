import Shopify, { AuthQuery } from '@shopify/shopify-api';

import { Handler } from '../types';

export const login: Handler = async (req, res) => {
  let authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    process.env.SHOP!,
    '/auth/callback',
    false
  );
  return res.redirect(authRoute);
};

export const callback: Handler = async (req, res) => {
  try {
    console.log('authCallback');
    await Shopify.Auth.validateAuthCallback(req, res, req.query as unknown as AuthQuery);
  } catch (error) {
    console.error(error);
  }
  return res.redirect(`/`);
};
