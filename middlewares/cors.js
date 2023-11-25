/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
const allowedCors = [
  'http://dimadanilchenko.nomoredomainsmonster.ru/',
  'http://api.dimadanilchenko.nomoredomainsmonster.ru/',
  'https://dimadanilchenko.nomoredomainsmonster.ru',
  'https://api.dimadanilchenko.nomoredomainsmonster.ru/',
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send();
    return;
  }
  next();
};

module.exports = cors;