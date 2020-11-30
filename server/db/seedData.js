const faker = require('faker')
const Question = require('./question.js');
const Answer = require('./answer.js');
const db = require('./index.js');

exports.seedQ = function() {
  for (var i = 0; i < 10; i++) {
    var user = faker.fake("{{name.firstName}}");
    var date = faker.fake("{{date.recent}}");
    var q = faker.fake("{{lorem.sentence}}");
    var quest = {user: user, date: date, question: q, answers: []};
    Question.create(quest);
  }
  // seedA();
  for(var i = 0; i < 35; i++) {

    var user = faker.fake("{{name.firstName}}");
    var date = faker.fake("{{date.recent}}");
    var a = faker.fake("{{lorem.sentences}}");
    var yes = Math.floor(Math.random()*(5));
    var no = Math.floor(Math.random()*(5));
    var flag = false;
    var ans = {user: user, date: date, answer: a, yes: yes, no: no, flag: flag}
    Answer.create(ans)
    .then((results) => {
      var id = results._id;
      Question.find({})
      .then((quests) => {
        var random = Math.floor(Math.random()*quests.length);
        quests[random].answers.push(id);
        quests[random].save()
      })
      .catch((err) => {
        console.error(err);
      })
    })
    .catch((err) => {
      console.error(err);
    })

  }
}

// exports.seedA = function() {


// }
// seedQ();


