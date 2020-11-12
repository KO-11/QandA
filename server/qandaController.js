const Qanda = require('./db/qanda.js');

exports.retrieve = function (req, res) {
  Qanda.find({})
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.postQ = function (req, res) {
  Qanda.create(req.body)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.retrieveOne = function (req, res) {
  Qanda.findOne({_id: req.params.id})
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.updateOne = function (req, res) {
  Qanda.findOneAndUpdate({_id: req.params.id}, req.body)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.putA = function (req, res) {
  Qanda.findOneAndUpdate({_id: req.params.id}, req.body)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

