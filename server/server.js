const express = require('express');
const bodyparser = require('body-parser');
const morgan =require('morgan');
const cors = require('cors');
const path = require('path');
const qandaRouter = require('./qandaRouter.js')
const db = require('./db')
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', qandaRouter);

module.exports = app;