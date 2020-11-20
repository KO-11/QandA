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
  let q =  req.body.q;
  let a = req.body.a;
  Answer.create(a)
    .then((ansResults) => {
      console.log(ansResults, 'ans');
      console.log(ansResults._id, 'ans id');
      Question.findOne(q)
        .then((questResults) => {
          questResults.answers.push(ansResults._id);
          questResults.save();
          res.status(200).json(questResults);
        })
        .catch((err) => {
          res.status(400).send(err);
        })
    })
}

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


