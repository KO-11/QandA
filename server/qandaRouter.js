const qandaRouter = require('express').Router();
const qandaController = require('./qandaController');

qandaRouter.route('/qanda')
  .get(qandaController.retrieve)
  .post(qandaController.postQ)

qandaRouter.route('/qanda/quest/:id')
  .get(qandaController.retrieveOne)

qandaRouter.route('/qanda/ans')
  .post(qandaController.postA)

qandaRouter.route('/qanda/ans/:id')
  .put(qandaController.updateA)

module.exports = qandaRouter