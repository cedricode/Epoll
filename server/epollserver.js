/**
 * Created by shen on 15/8/24.
 */

Questions = new Mongo.Collection("questions");

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
            'submittedBy': Meteor.userId()
        });
        return questionId;
    },
    incrementYesVotes: function (questionId) {

        console.log("incrementYes:" + questionId);
        Questions.update(questionId, {$inc: {num: 1}});
    },
    incrementNoVotes: function (questioId) {
        console.log("incementNo:" + questioId);
        Questions.update(questioId, {$inc: {num: -1}});
    },
    deleteVote: function (questionId) {
        console.log("deleteVote:" + questionId);
        Questions.remove(questionId);

    }
});