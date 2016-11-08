
var awsIot = require('aws-iot-device-sdk');


var thing = awsIot.thingShadow({
   keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
    caPath: './certs/root-ca.crt',
  clientId: 'tobeiotupdater',
    region: 'us-east-1'
});

var colorOptions = ['R','G','B'];
var thingName = 'demo';


  thing.on('update',function(thingName, stateObject) {  
    console.log('received update '+' on '+thingName+': '+  
    JSON.stringify(stateObject));  
    }); 

thing.on('connect', function() {
      console.log('connected thingShadow updater');
      thing.register(thingName);
  });
    
thing.on('message', function(topic, payload) {
  console.log('message', topic, payload.toString());
});

thing.on('error', function(error) {  
    console.log('error', error);  
  }); 


function selectColor(){
  var colorIndex = Math.round((Math.random() * 2)) ;
  var brightnessIndex = Math.round((Math.random() * 35)) ;
  var state = { "state": 
                { 
                  "reported" : 
                    {
                      "color": colorOptions[colorIndex],
                      "brightnessIndex": brightnessIndex 
                    } 
                }
              };

  console.log("current state : " + JSON.stringify(state));
  thing.update(thingName,state);
}

setInterval(selectColor,3000);


