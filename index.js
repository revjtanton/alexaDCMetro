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

/**
 * Setting up our API calls
 */

function test() {
	response.tellWithCard("red line test", "Greeter", "red line test");
}

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
    var speechOutput = "For DC Metro line status please say the line color.";
    var repromptText = "You can say red, orange, silver, blue, yellow, or green.";
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
		var https = require('https');
		var options = {
		  host: 'api.wmata.com',
		  port: 443,
		  path: '/Incidents.svc/json/Incidents',
		  method: 'GET',
		  headers: {
			  api_key: 'a4e46f6ec23946a581aa86dfea5091ff'
		  }
		};

		var req = https.request(options, function(res) {
		  console.log(res.statusCode);
		  res.on('data', function(d) {
			// process.stdout.write(d);
			var de = JSON.parse(d);
			var rep = '';
			
			for(var i = 0;i < de.Incidents.length;i++) {
				if(de.Incidents[i].LinesAffected === "RD;") {
					rep += de.Incidents[i].Description;
//					response.tellWithCard(de.Incidents[i].Description, "Greeter", de.Incidents[i].Description);
				}
			}
			response.tellWithCard(rep, "Greeter", rep);
		  });
		});
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
    },
    OrangeLineIntent: function (intent, session, response) {
		var https = require('https');
		var options = {
		  host: 'api.wmata.com',
		  port: 443,
		  path: '/Incidents.svc/json/Incidents',
		  method: 'GET',
		  headers: {
			  api_key: 'a4e46f6ec23946a581aa86dfea5091ff'
		  }
		};

		var req = https.request(options, function(res) {
		  console.log(res.statusCode);
		  res.on('data', function(d) {
			// process.stdout.write(d);
			var de = JSON.parse(d);
			
			for(var i = 0;i < de.Incidents.length;i++) {
				if(de.Incidents[i].LinesAffected === "OR;") {
					response.tellWithCard(de.Incidents[i].Description, "Orange Line Status", de.Incidents[i].Description);
				}
			}
		  });
		});
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
    },
    SilverLineIntent: function (intent, session, response) {
		var https = require('https');
		var options = {
		  host: 'api.wmata.com',
		  port: 443,
		  path: '/Incidents.svc/json/Incidents',
		  method: 'GET',
		  headers: {
			  api_key: 'a4e46f6ec23946a581aa86dfea5091ff'
		  }
		};

		var req = https.request(options, function(res) {
		  console.log(res.statusCode);
		  res.on('data', function(d) {
			// process.stdout.write(d);
			var de = JSON.parse(d);
			
			for(var i = 0;i < de.Incidents.length;i++) {
				if(de.Incidents[i].LinesAffected === "SV;") {
					response.tellWithCard(de.Incidents[i].Description, "Greeter", de.Incidents[i].Description);
				}
			}
		  });
		});
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
    },
    BlueLineIntent: function (intent, session, response) {
		var https = require('https');
		var options = {
		  host: 'api.wmata.com',
		  port: 443,
		  path: '/Incidents.svc/json/Incidents',
		  method: 'GET',
		  headers: {
			  api_key: 'a4e46f6ec23946a581aa86dfea5091ff'
		  }
		};

		var req = https.request(options, function(res) {
		  console.log(res.statusCode);
		  res.on('data', function(d) {
			// process.stdout.write(d);
			var de = JSON.parse(d);
			
			for(var i = 0;i < de.Incidents.length;i++) {
				if(de.Incidents[i].LinesAffected === "BL;") {
					response.tellWithCard(de.Incidents[i].Description, "Greeter", de.Incidents[i].Description);
				}
			}
		  });
		});
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
    },
    YellowLineIntent: function (intent, session, response) {
		var https = require('https');
		var options = {
		  host: 'api.wmata.com',
		  port: 443,
		  path: '/Incidents.svc/json/Incidents',
		  method: 'GET',
		  headers: {
			  api_key: 'a4e46f6ec23946a581aa86dfea5091ff'
		  }
		};

		var req = https.request(options, function(res) {
		  console.log(res.statusCode);
		  res.on('data', function(d) {
			// process.stdout.write(d);
			var de = JSON.parse(d);
			
			for(var i = 0;i < de.Incidents.length;i++) {
				if(de.Incidents[i].LinesAffected === "YL;") {
					response.tellWithCard(de.Incidents[i].Description, "Greeter", de.Incidents[i].Description);
				}
			}
		  });
		});
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
    },
    GreenLineIntent: function (intent, session, response) {
		var https = require('https');
		var options = {
		  host: 'api.wmata.com',
		  port: 443,
		  path: '/Incidents.svc/json/Incidents',
		  method: 'GET',
		  headers: {
			  api_key: 'a4e46f6ec23946a581aa86dfea5091ff'
		  }
		};

		var req = https.request(options, function(res) {
		  console.log(res.statusCode);
		  res.on('data', function(d) {
			// process.stdout.write(d);
			var de = JSON.parse(d);
			
			for(var i = 0;i < de.Incidents.length;i++) {
				if(de.Incidents[i].LinesAffected === "GN;") {
					response.tellWithCard(de.Incidents[i].Description, "Greeter", de.Incidents[i].Description);
				}
			}
		  });
		});
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
    },
	
    PurpleMonkeyIntent: function (intent, session, response) {
        response.tell("Well!  I'll show you!  Especially for that purple monkey dishwasher remark!");
    },
	
    HelpIntent: function (intent, session, response) {
        response.ask("You can say red, orange, silver, blue, yellow, or green.", "You can say red, orange, silver, blue, yellow, or green.");
    }
};

MetroStatus.status = function() {//Load the request module
	var request = require('request');

	//Lets configure and request
	request({
		url: 'https://api.wmata.com/Incidents.svc/json/Incidents', //URL to hit
		method: 'GET', //Specify the method
		headers: { //We can define headers too
			'api_key': 'a4e46f6ec23946a581aa86dfea5091ff'
		}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
		}
	});
	
	return request;
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MetroStatus skill.
    var metroStatus = new MetroStatus();
    metroStatus.execute(event, context);
};

