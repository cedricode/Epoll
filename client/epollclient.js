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