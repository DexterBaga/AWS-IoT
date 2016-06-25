
var awsIot = require('aws-iot-device-sdk');


var device = awsIot.device({
   keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
    caPath: './certs/root-CA.crt',
  clientId: 'tobeiot',
    region: 'us-east-1'
});

var colorOptions = ['R','G','B'];

device
  .on('connect', function() {
    console.log('connected');
    device.subscribe('signal/color');
  });
  
  device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });


function selectColor(){
    var index = Math.round((Math.random() * 2)) ;
    console.log(index);
    device.publish('signal/colorcode','{"color":"' + colorOptions[index] + '"}');
}

setInterval(selectColor,2000);