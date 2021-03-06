# TelstraMessaging.ProvisionNumberRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**activeDays** | **Number** | The number of days before for which this number is provisioned. Usually this will be same as the plan you buy.  | [optional] 
**notifyURL** | **String** | A notification URL that will be POSTed to whenever a new message (e.g. a reply to a message sent) arrives at this destination address.  If this is not provided then you can use the Get /sms or /mms API to poll for reply messages. *Please note that the notification URLs and the Get /sms or /mms call are exclusive. If a notification URL has been set then the GET call will not provide any useful information.*  | [optional] 
**callbackData** | **String** | A JSON that will be sent as the body in the POST to the notifyURL. This can be any meaningful data relevant to your application.  | [optional] 


