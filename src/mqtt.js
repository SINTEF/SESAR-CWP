import mqtt from 'mqtt';
const client = mqtt.connect('ws://localhost:9001/mqtt');

var airtrafficMessages = require('./ProtobufAirTrafficSimulator_pb');
// var message = new airtrafficMessages.Position4D(); //creating a new message

client.on('connect', function() {
    console.log("Connected to MQTT broker");
    client.subscribe('#', function(err) {
        console.log("Subscribed to all topics");
        if (!err) {
            client.publish('hello', 'Hello world')
        }
    })
})
client.on('message', function(topic, message) {

    // var serializedData = JSON.stringify(message);
    // var decodedMessage = JSON.parse(serializedData, 'Uint8Array');

    try {
        var message2 = airtrafficMessages.TargetReportMessage.deserializeBinary(message)
        console.log(message2);
        var object = airtrafficMessages.TargetReportMessage.toObject(message2, {

            })
            // const root = Protobuf.load('ProtobufAirTrafficSimulator.proto');
            // const User = root.lookupType('ProtobufAirTrafficSimulator.Position4D');
            // const obj = User.decode(message);
            // const jsonBytestoString = String.fromCharCode(...message)
            // console.log(jsonBytestoString);
            // var arrayUTF8 = fromUTF8Array(message);
            // console.log(obj);
            // var decodedMessage = byteNumbers.Root.decode(message);
            // var decodedMessage = UTF8.Message.decode(message)
            // var AwesomeMessage = AwesomeMessage.type(message);
            // console.log(AwesomeMessage);
            // const root = protobuf.Root.toJSON(message)
            // console.log(decodedMessage);


    } catch (e) {
        console.log(e.toString())
    }
})

// function fromUTF8Array(data) { // array of bytes
//     var str = '',
//         i;

//     for (i = 0; i < data.length; i++) {
//         var value = data[i];

//         if (value < 0x80) {
//             str += String.fromCharCode(value);
//         } else if (value > 0xBF && value < 0xE0) {
//             str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
//             i += 1;
//         } else if (value > 0xDF && value < 0xF0) {
//             str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
//             i += 2;
//         } else {
//             // surrogate pair
//             var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

//             str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
//             i += 3;
//         }
//     }

//     return str;
// }