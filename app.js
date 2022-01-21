const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./src/api/routes');

const sequelize = require('./src/util/database');

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

sequelize.authenticate();

app.use('/api', routes());

app.listen(process.env.PORT || 8080);
