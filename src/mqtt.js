import mqtt from 'mqtt';

const client  = mqtt.connect('ws://localhost:9001/mqtt');
client.on('connect', function () {
  console.log("Connected to MQTT broker");
  client.subscribe('#', function (err) {
    console.log("Subscribed to all topics");
    if (!err) {
      client.publish('hello', 'Hello world')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log("Received message");
  console.log(message.toString())
})