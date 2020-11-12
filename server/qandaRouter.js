const qandaRouter = require('express').Router();
const qandaController = require('./qandaController');

qandaRouter.route('/qanda')
  .get(qandaController.retrieve)
  .post(qandaController.postQ)

qandaRouter.route('/qanda/:id')
  .get(qandaController.retrieveOne)
  .put(qandaController.updateOne)

qandaRouter.route('/qanda/ans/:id')
  .put(qandaController.putA)

module.exports = qandaRouter