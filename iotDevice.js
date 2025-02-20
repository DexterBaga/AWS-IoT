
var awsIot = require('aws-iot-device-sdk');

var currentSettings = {};

var thing = awsIot.thingShadow({
   keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
    caPath: './certs/root-ca.pem',
  clientId: 'tobeiotreader',
    region: 'us-east-1',
    host: 'IOT Domain Name from AWS IOT>CONNECT>DOMAIN CONFIGURATIONS' 
});

var thingName = 'iotDemo';

thing.on('connect', function() {
      console.log('IOT device now connected.');
      thing.register(thingName);
});   


thing.on('delta',(thingName, delta)=>{
  console.log('\n\n-------------- Current Settings -------------\n' + JSON.stringify(currentSettings,null,2));
  console.log('\n******** Received State Delta********\n' + JSON.stringify(delta.state,null,2));
 
  console.log('+++++++ Simulating Update to local settings ++++++++');
  
  for(var prop in delta.state){
    currentSettings[prop] = delta.state[prop];
  }  

  console.log('+++++++ Responding to iotApp accepting new settings ++++++++');

  thing.publish('$aws/things/' + thingName + '/shadow/update',
    JSON.stringify({
      state: {
        reported: delta.state
      }
    }));    
}); 

