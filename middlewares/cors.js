/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
const allowedCors = [
  'https://dimadanilchenko.nomoredomainsmonster.ru',
  'http://dimadanilchenko.nomoredomainsmonster.ru',
  'https://api.dimadanilchenko.nomoredomainsmonster.ru',
  'http://api.dimadanilchenko.nomoredomainsmonster.ru',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5555',
  'http://localhost:7777',
  'https://localhost:3000',
  'http://127.0.0.1:5555',
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
