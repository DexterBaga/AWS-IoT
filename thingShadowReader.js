
var awsIot = require('aws-iot-device-sdk');


var thing = awsIot.thingShadow({
   keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
    caPath: './certs/root-ca.crt',
  clientId: 'tobeiotreader',
    region: 'us-east-1'
});

var thingName = 'demo';

thing.on('connect', function() {
      console.log('connected thingShadow reader');
      thing.register(thingName);
});   

setInterval(function() {
  var data = thing.get(thingName);
  console.log(JSON.stringify(data))
},3000);


thing.on('status',  
  function(thingName, stat, clientToken, stateObject) {  
    console.log('\n----------------------------\n '+  
    JSON.stringify(stateObject,null,2)); 

    //var data = JSON.parse(stateObject);
    if(stateObject["state"]["reported"]["color"] === "G"){
      thing.publish('thing/signal/color',
                JSON.stringify({
                  message: 'delta value ' +
                      JSON.stringify(stateObject.state)
                })); 
    }
    
  });  

