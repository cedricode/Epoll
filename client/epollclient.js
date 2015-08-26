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
Answers = new Mongo.Collection("answers");

Accounts.ui.config({

    passwordSignupFields: "USERNAME_ONLY"
});


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

/*Template.questions.items = function () {
 var parents = Questions.find({}, {sort: {'num': -1, 'submittedOn': -1}});

 /!*    for (var i = 0; i < parents.length; i++) {
 var pId = parents[i]['_id'];
 var children = Answers.find({questionId: {$eq: 'pId'}});
 parents[i]['answers'] = children;
 }*!/

 return parents;
 };*/

Template.questions.helpers({
    items: function () {

        return Questions.find({}, {sort: {'num': -1, 'submittedOn': -1}});
    }

});


Template.question.helpers({

    answers: function () {
        return Answers.find({questionId: this._id}, {sort: {'num': -1, 'submittedOn': -1}});
    },
    author: function () {
        if (this.submittedUser === null) {
            return "<p style='display:inline;color:red;font-size:xx-small'>unknown</p>";
        }
        else if (this.submittedUser !== null) {
            return "<p style='display:inline;color:green;font-size:xx-small'>" + this.submittedUser + "</p>";
        }
    }

});

Template.question.events({
    "click": function () {
        Session.set("selected_questionId", this._id);
    },

    "click a.yes": function (event) {
        event.preventDefault();
        VerifyLogin();
        var selected_questionId = Session.get("selected_questionId");
        console.log("updating yes count for answerid:" + selected_questionId);
        Meteor.call("incrementYesVotes", selected_questionId);

    },

    "click a.no": function (event) {
        event.preventDefault();

        VerifyLogin();
        var selected_questionId = Session.get("selected_questionId");
        console.log("updating no count for answerid:" + selected_questionId);
        Meteor.call("incrementNoVotes", selected_questionId);

    },
    "click a.delete": function (event) {
        event.preventDefault();
        if (Meteor.userId()) {
            var selected_questionId = Session.get("selected_questionId");

            BootstrapModalPrompt.prompt({
                title: "Confirm",
                content: "Do you really want to delete whatever?"
            }, function (result) {
                if (result) {
                    console.log("delete for questionid:" + selected_questionId);
                    Meteor.call("deleteQuestion", selected_questionId);
                }
            });
        }
    },
    "click input.add-answer": function (event) {
        event.preventDefault();
        var selected_questionId = Session.get("selected_questionId");
        var answerText = document.getElementById('answerText' + selected_questionId.toString()).value;

        VerifyLogin();
        Meteor.call("addAnswer", selected_questionId, answerText, function (error, answerId) {

            console.log("add answer with id..." + answerId);

        });
        document.getElementById('answerText' + selected_questionId.toString()).value = "";

    }
});

function VerifyLogin() {

    if (!Meteor.userId()) {
        BootstrapModalPrompt.prompt({
            title: "Attention",
            content: "Please sign in first"
        });
        return;
    }
}

Template.members.helpers({

    items: function () {

    }
});