
var awsIot = require('aws-iot-device-sdk');


var thing = awsIot.thingShadow({
   keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
    caPath: './certs/root-CA.crt',
  clientId: 'tobeiot',
    region: 'us-east-1'
});

var colorOptions = ['R','G','B'];

thing
  .on('connect', function() {
    console.log('connected thingShadow reader');
  });
  
  thing
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });

thing.on('delta', function(thingName, stateObject) {
      thing.publish('thing/signal/color',
            JSON.stringify({
               message: 'delta value ' +
                  JSON.stringify(stateObject.state)
            }));
   });
