const qandaRouter = require('express').Router();
const qandaController = require('./qandaController');

qandaRouter.route('/qanda')
  .get(qandaController.retrieve)
  .post(qandaController.postQ)

qandaRouter.route('/qanda/:id')
  .get(qandaController.retrieveOne)
  .put(qandaController.updateOne)

module.exports = qandaRouter