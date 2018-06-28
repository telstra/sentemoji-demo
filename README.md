# Sentemoji

Gather sentiment scoring from emojis sent to a provisioned number that will route requests through to an app for sentiment scoring.

## Technology

This demo uses

* ExpressJS
* Socketio
* Realm
* TelstraDev messagingAPI
* Emoji's

## Requirements

* Valid and active client_id and client_secret from [Dev.Telstra.com](https://dev.telstra.com).
* A valid and active mobile number subscription against the demo app using the povisioning API, as part of this you will need to register the webhook callback for where the script is running. A provision route is included in the code so that you can generate a number if needed. 

## Running the demo

* Update client_id and client_secret from [Dev.Telstra.com](https://dev.telstra.com) into ./app.js
* Run `npm install` to add dependencies
* Run  `npm run serve` to start the server
* Send a SMS message to your provisioned app number with some emojis

## Useful link

* [Messaging API getting started](https://dev.telstra.com/content/messaging-api-getting-started)