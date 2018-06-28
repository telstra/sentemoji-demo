var express = require('express');
bodyParser = require('body-parser');
Realm = require('realm');
var TelstraMessaging = require('Telstra_Messaging');
var sentiment = require('node-sentiment');

var api = new TelstraMessaging.AuthenticationApi()
var clientId = ""; // {String} 
var clientSecret = ""; // {String} 
var grantType = "client_credentials"; // {String} 

var app = express();
var server = app.listen(8080);
var io = require('socket.io')(server);

app.io = io;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let DataSchema = {
  name: 'sms',
  properties: {
    timestamp: 'date',
    msgid: 'string',
    from: 'string',
    msg: 'string',
    sentiment: 'float'
  }
};

var smsData = new Realm({
  path: 'data.sms',
  schema: [DataSchema],
  schemaVersion: 3,
});

function sentemoji(data){

  var ranges = [
    '\ud83c[\udf00-\udfff]', 
    '\ud83d[\udc00-\ude4f]', 
    '\ud83d[\ude80-\udeff]'  
  ];

  data = data.match(new RegExp(ranges.join('|'), 'g'), '');

  if(data){
    var ts = 0;
    for (var i in data){
      ts += sentiment(data[i]).score;
    }   
    data = data.join('');
  }
  else{
    data = "";
    ts = 0;    
  }

  return {ts: ts, emoji: data};   

}

app.post('/', function (req, res) {

  console.log(req.body);

  var emoji = sentemoji(req.body['body']);

  let msgid = req.body['messageId'],
   msg = emoji.emoji,
   from = req.body['from'],
   score = emoji.ts,
   timestamp = req.body['sentTimestamp'];

  smsData.write(() => {
      smsData.create('sms', {msgid: msgid, msg: msg, timestamp: req.body['sentTimestamp'], sentiment: score, from: from});
  });

    req.app.io.emit('score', smsData.objects('sms').sum('sentiment'));
    req.app.io.emit('smsdata', {msgid: msgid, from: "04XXXXX"+from.slice(-3), msg: msg, sentiment: score});

});

app.get('/provision', function(req, res) {

  var callback = function(error, data, response) {

    var defaultClient = TelstraMessaging.ApiClient.instance;
    var auth = defaultClient.authentications['auth'];
    auth.accessToken = data.access_token;

    var apiInstance = new TelstraMessaging.ProvisioningApi();

    var provisionNumberRequest = new TelstraMessaging.ProvisionNumberRequest(); // ProvisionNumberRequest | A JSON payload containing the required attributes
    provisionNumberRequest.notifyURL = "";

    var callback = function(error, data, response) {
      if (error) {
        res.send(error);
      } else {
        console.log(data);
      }
    };
    apiInstance.createSubscription(provisionNumberRequest, callback);

  }
  api.authToken(clientId, clientSecret, grantType, callback);

})

app.get('/', function(req, res) {
  res.render('index.ejs');
});

io.on('connection', function (socket) {

  socket.emit('score', smsData.objects('sms').sum('sentiment'));

  let smss = smsData.objects('sms').sorted('timestamp', true).filtered('msg.@size > 0 and from.@size > 0');

  for (var i in smss) {
    socket.emit('smsdata', {msgid: smss[i].msgid, from: "04XXXXX"+smss[i].from.slice(-3), msg: smss[i].msg, sentiment: smss[i].sentiment});
  }

});