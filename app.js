const express = require('express');
const bodyParser = require('body-parser');

//const UserService = require('./src/services/user');

const app = express();
const routes = require('./src/api/routes');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//sequelize.authenticate();

app.use('/api', routes());

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  let message = error.message;
  res.status(status).json({ status, message });
});

//UserService.postCreate();

app.listen(process.env.PORT || 8080);
