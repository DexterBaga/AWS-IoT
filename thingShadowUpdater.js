
var awsIot = require('aws-iot-device-sdk');


var thing = awsIot.thingShadow({
   keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
    caPath: './certs/root-CA.crt',
  clientId: 'tobeiot',
    region: 'us-east-1'
});

var colorOptions = ['R','G','B'];
var thingName = 'TestDevice';

thing
  .on('connect', function() {
    console.log('connected thingShadow updater');
  });
  
  thing
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });


function selectColor(){
    var index = Math.round((Math.random() * 2)) ;
    var state = { color: colorOptions[index] };
    thing.Update['update'](thingName,state);
}

setInterval(selectColor,2000);