export const config = {
  SERVER_URL:
    process.env.REACT_APP_SERVER_URL_DEV_LOCAL &&
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_SERVER_URL_DEV_LOCAL
      : process.env.REACT_APP_SERVER_URL,
  NODE_ENV: process.env.NODE_ENV,
};
