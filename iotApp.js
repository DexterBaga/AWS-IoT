
var awsIot = require('aws-iot-device-sdk');


var thing = awsIot.thingShadow({
   keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
    caPath: './certs/root-ca.pem',
  clientId: 'tobeiotupdater',
    region: 'us-east-1',
     host:'IOT Domain Name from AWS IOT>CONNECT>DOMAIN CONFIGURATIONS' 
});

var statusOptions = ['Pause','Start', 'Stop','Shutdown'];
var thingName = 'iotDemo';

thing.on('status',function(thingName, stat, clientToken, stateObject) {  
    console.log('\n\nIOT device applied the following settings: ' ,
      JSON.stringify(stateObject.state.desired)); 
    console.log('\n\nHit ENTER to send new settings to IOT device');
}); 

thing.on('connect', function() {
      thing.register(thingName);
  });    

function sendNewSettings(){
  var statusIndex = Math.round((Math.random() * 3)) ;
  var flowRate = Math.round((Math.random() * 35)) ;
  var desiredState = { "state": 
                { 
                  "desired" : 
                    {
                      "status": statusOptions[statusIndex],
                      "flowRate": flowRate 
                    } 
                }
              };

  console.log("Sending new settings to device : " + JSON.stringify(desiredState));
  thing.update(thingName,desiredState);
}

const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
 });

console.log('Hit ENTER to send new settings to IOT device');
readline.on('line', (input) => {
  sendNewSettings();
});

