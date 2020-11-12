const express = require('express');
const bodyparser = require('body-parser');
const morgan =require('morgan');
const cors = require('cors');
const qandaRouter = require('./qandaRouter.js')
const db = require('./db')
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());

app.use('/api', qandaRouter);

module.exports = app;