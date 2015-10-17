/**
 * This is an Alexa Skill for reporting the current DC Metro status for each line.
 */

/**
 * App ID for the skill
 */
var APP_ID = ''; 
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
 * Getting the data for each line on request from WMATA.
 */
MetroStatus.getMetroStatus = function(response, line) {
	var https = require('https');
	var options = {
	  host: 'api.wmata.com',
	  port: 443,
	  path: '/Incidents.svc/json/Incidents',
	  method: 'GET',
	  headers: {
		  api_key: ''
	  }
	};
	var req = https.request(options, function(res) {
		console.log(res.statusCode);
		res.on('data', function(d) {
			var de = JSON.parse(d);
			var rep = '';
			
			for(var i = 0;i < de.Incidents.length;i++) {
				if(de.Incidents[i].LinesAffected === line) {
					rep += de.Incidents[i].Description;
				}
			}
			response.tellWithCard(rep, "from WMATA's API", rep);
		});
	});
	req.end();
	req.on('error', function(e) {
		console.error(e);
	});
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
		MetroStatus.getMetroStatus(response,"RD;");
    },
    OrangeLineIntent: function (intent, session, response) {
		MetroStatus.getMetroStatus(response,"OR;");
    },
    SilverLineIntent: function (intent, session, response) {
		MetroStatus.getMetroStatus(response,"SV;");
    },
    BlueLineIntent: function (intent, session, response) {
		MetroStatus.getMetroStatus(response,"BL;");
    },
    YellowLineIntent: function (intent, session, response) {
		MetroStatus.getMetroStatus(response,"YL;");
    },
    GreenLineIntent: function (intent, session, response) {
		MetroStatus.getMetroStatus(response,"GN;");
    },
    PurpleMonkeyIntent: function (intent, session, response) {
        response.tell("Well!  I'll show you!  Especially for that purple monkey dishwasher remark!");
    },
    HelpIntent: function (intent, session, response) {
        response.ask("You can say red, orange, silver, blue, yellow, or green.", "You can say red, orange, silver, blue, yellow, or green.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MetroStatus skill.
    var metroStatus = new MetroStatus();
    metroStatus.execute(event, context);
};

