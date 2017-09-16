"use strict"

const serverInstance = require('express')();

const  FCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send',
  FCM_APPID = '',
  PORT = 8888,
  Devices = require('./devicesdb'),
  Fetcher = require('./statefetcher'),
  Notification = require('./notification');
  
let mDevices = new Devices();
	
// a device has subscribed to service and sends token:
serverInstance.get('/subscribe', function (req, res) {
  mDevices.subscribe(res.query.token);
})
// a device has unsubscribed to service and sends token:
serverInstance.get('/unsubscribe', function (req, res) {
  mDevices.unsubscribe(res.query.token);
})

// start server on port 80 
serverInstance.listen(PORT, function () {
  console.log('Server started at port ' + PORT );
});

let mFetcher = new Fetcher();
mFetcher.start();

mFetcher.on('data', (payload)=> {
  new Notification(payload);
   
}); 


