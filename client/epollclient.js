/**
 * Created by shen on 15/8/24.
 */

Template.hello.greeting = function () {
    return "The Missing Meteor Tutorial!!!";
};

Template.hello.events({
    'click input' : function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
            console.log("You pressed the button");
    }
});