/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.d7aa8cbb-2468-4863-96be-0ce1b9cbbd1a'; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * dcMetro is a child of AlexaSkill.
 */
var dcMetro = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
dcMetro.prototype = Object.create(AlexaSkill.prototype);
dcMetro.prototype.constructor = HelloWorld;

dcMetro.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

dcMetro.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("dcMetro onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Thank you for inquiring about the DC Metro status.  What line where you curious about?  You can say Red, Orange, Silver, Blue, Yellow, or Green to get the status of a particular line.";
    var repromptText = "You inquired about the status of the D.C. Metro.  You can say Red, Orange, Silver, Blue, Yellow, or Green to get the status of a particular line.";
    response.ask(speechOutput, repromptText);
};

dcMetro.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

dcMetro.prototype.intentHandlers = {
    // register custom intent handlers
    RedLineIntent: function (intent, session, response) {
        response.tellWithCard("Placeholder for red status", "DC Metro Status", "Placeholder for red status");
    },
    OrangeLineIntent: function (intent, session, response) {
        response.tellWithCard("Placeholder for orange status", "DC Metro Status", "Placeholder for orange status");
    },
    SilverLineIntent: function (intent, session, response) {
        response.tellWithCard("Placeholder for silver status", "DC Metro Status", "Placeholder for silver status");
    },
    BlueLineIntent: function (intent, session, response) {
        response.tellWithCard("Placeholder for blue status", "DC Metro Status", "Placeholder for blue status");
    },
    YellowLineIntent: function (intent, session, response) {
        response.tellWithCard("Placeholder for yellow status", "DC Metro Status", "Placeholder for yellow status");
    },
    GreenLineIntent: function (intent, session, response) {
        response.tellWithCard("Placeholder for green status", "DC Metro Status", "Placeholder for green status");
    },
    HelpIntent: function (intent, session, response) {
        response.ask("You can say Red, Orange, Silver, Blue, Yellow, or Green to get the status of a particular line.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var dcMetro = new dcMetro();
    dcMetro.execute(event, context);
};

