/**
 * Created by shen on 15/8/24.
 */

Questions = new Mongo.Collection("questions");
Answers = new Mongo.Collection("answers");
/*if(Questions.find().count()===0){
 Questions.insert({
 'questionText':'Why does the sun shine?',
 'submittedOn':new Date(),
 'num':0
 });
 Questions.insert({
 'questionText':'If you were a hot dog, and you were starving to death, would you eat yourself?',
 'submittedOn':new Date(),
 'num':0
 });
 Questions.insert({
 'questionText':'What is the airspeed velocity of an unladen swallow?',
 'submittedOn':new Date(),
 'num':0
 });
 }*/

Meteor.startup(function () {
    // code to run on server at startup

});

Meteor.methods({

    addQuestion: function (text) {
        console.log("add question");
        var questionId = Questions.insert({
            'questionText': text,
            'submittedOn': new Date(),
            //'submittedBy': Meteor.user().profile.name + "_" + Meteor.userId()
            'submittedBy': Meteor.userId(),
            'num': 0
        });
        return questionId;
    },
    incrementYesVotes: function (answerId) {

        console.log("incrementYes:" + answerId);
        Answers.update(answerId, {$inc: {num: 1}});
    },
    incrementNoVotes: function (answerId) {
        console.log("incementNo:" + answerId);
        Answers.update(answerId, {$inc: {num: -1}});
    },
    deleteQuestion: function (questionId) {
        console.log("deleteVote:" + questionId);
        Answers.remove({'questionId': {$eq: questionId}});
        Questions.remove(questionId);
    },
    addAnswer: function (questionId, text) {

        console.log("add answer");
        var answerId = Answers.insert({
            'questionId': questionId,
            'answerText': text,
            'submittedOn': new Date(),
            'submittedBy': Meteor.userId(),
            'num': 0
        });
        return answerId;
    }
});