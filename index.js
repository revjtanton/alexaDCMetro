/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This is an Alexa Skill for reporting the current DC Metro status for each line.
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.3d2e1dd8-1405-4c01-aa24-f75acc1020d4'; 

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * MetroStatus is a child of AlexaSkill.
 */
var MetroStatus = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MetroStatus.prototype = Object.create(AlexaSkill.prototype);
MetroStatus.prototype.constructor = MetroStatus;

MetroStatus.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MetroStatus onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

MetroStatus.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MetroStatus onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "test";
    var repromptText = "test";
    response.ask(speechOutput, repromptText);
};

MetroStatus.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MetroStatus onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

MetroStatus.prototype.intentHandlers = {
    // register custom intent handlers
    RedLineIntent: function (intent, session, response) {
        response.tellWithCard("red line test", "Greeter", "red line test");
    },
    OrangeLineIntent: function (intent, session, response) {
        response.tellWithCard("orange line test", "Greeter", "orange line test");
    },
    SilverLineIntent: function (intent, session, response) {
        response.tellWithCard("silver line test", "Greeter", "silver line test");
    },
    BlueLineIntent: function (intent, session, response) {
        response.tellWithCard("blue line test", "Greeter", "blue line test");
    },
    YellowLineIntent: function (intent, session, response) {
        response.tellWithCard("yellow line test", "Greeter", "yellow line test");
    },
    GreenLineIntent: function (intent, session, response) {
        response.tellWithCard("green line test", "Greeter", "green line test");
    },
    HelpIntent: function (intent, session, response) {
        response.ask("help test.", "help test.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MetroStatus skill.
    var metroStatus = new MetroStatus();
    metroStatus.execute(event, context);
};

