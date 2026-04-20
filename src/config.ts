export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://getza.co.uk';
export const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'getza_session';
export const SESSION_TTL_DAYS = Number(process.env.SESSION_TTL_DAYS || 30);
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PROD = NODE_ENV === 'production';

export const ADMIN_BOOTSTRAP_EMAIL = process.env.ADMIN_BOOTSTRAP_EMAIL;
export const ADMIN_BOOTSTRAP_PASSWORD = process.env.ADMIN_BOOTSTRAP_PASSWORD;
