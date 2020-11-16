const Question = require('./db/question.js');
const Answer = require('./db/answer.js');

exports.retrieve = function (req, res) {
  Question.find({})
    .populate('answers')
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.postQ = function (req, res) {
  Question.create(req.body)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.postA = function (req, res) {
  Question.create(req.body)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

// exports.postA = function (req, res) {
//   Answer.create(req.body)
//     .then((results) => {
//       res.status(200).json(results);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     })
// }

exports.retrieveOne = function (req, res) {
  Question.findOne({_id: req.params.id})
    .populate('answers')
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.updateA = function (req, res) {
  Answer.findOneAndUpdate({_id: req.params.id}, req.body)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}


