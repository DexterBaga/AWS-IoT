# AWS-IoT

The sample code mimics an IOT app that sends new settings to an IOT device. Once the IOT device receives the new settings, it will simulate saving the new settings and publishes a response to indicate that it accepted the new settings.

# Requirements
1. Create a new IOT thing in AWS named iotDemo (classic).
2. Assign an IOT policy that allows ALL IOT actions for the demo.  Limit the actions for prod.
3. Download the certificates to /certs folder.  See txt file contents for file names to use.
4. Get the IOT domain name from AWS IOT > CONNECT > DOMAIN CONFIGURATIONS and update HOST settings in iotApp.js and iotDevice.js.

# Run demo
1. npm i
2. node iotDevice.js
3. node iotApp.js 

Set the 2 terminal windows side by side.  On the iotApp window, hit ENTER key.  Observe the events in the iotDevice window.

*** This uses aws-iot-device-sdk v2 ***