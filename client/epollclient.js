/**
 * Created by shen on 15/8/24.
 */

/*
 Template.hello.greeting = function () {
 return "The Missing Meteor Tutorial!!!";
 };

 Template.hello.events({
 'click input' : function () {
 // template data, if any, is available in 'this'
 if (typeof console !== 'undefined')
 console.log("You pressed the button");
 }
 });*/

Questions = new Mongo.Collection("questions");
Template.addQuestion.events({
    "click input.add-question": function (event) {

        event.preventDefault();
        var questionText = document.getElementById('questionText').value;

        Meteor.call("addQuestion", questionText, function (error, questionId) {

            console.log("add question with id..." + questionId);
        });
        document.getElementById('questionText').value = "";
    }
});

Template.questions.helpers({
    items: function () {
        return Questions.find({}, {sort: {'submittedOn': -1}});
    }
});

Template.question.events({
    "click": function () {
        Session.set("selected_questionId", this._id);
    },
    "click a.yes": function (event) {

        event.preventDefault();
        if (Meteor.userId()) {
            var selected_questionId = Session.get("selected_questionId");
            console.log("updating yes count for questionid" + selected_questionId);
            Meteor.call("incrementYesVotes", selected_questionId);
        }
    },
    "click a.no": function (event) {
        event.preventDefault();
        if (Meteor.userId()) {
            var selected_questionId = Session.get("selected_questionId");
            console.log("updating no count for questionid" + selected_questionId);
            Meteor.call("incrementNoVotes", selected_questionId);
        }
    }
});