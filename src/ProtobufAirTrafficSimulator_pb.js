/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AccessType', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.ActivityType', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AircraftClass', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AllTargetReports', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AviationFlightCategory', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.DeIcingLevel', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.FlightRouteMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.FlightStatusCode', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.InitialisationCompleted', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.Milestone', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NetworkResourceType', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewAirBlockMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewAircraftMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewAirspaceMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewFlightMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewPointMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewRouteMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewSectorMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewSegmentMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.NewWaypointMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.ObjectType', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.PlannedFlightMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.PlanningStage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.Position', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.Position4D', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.Position4DCartesian', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.PositionAtObject', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.PreferenceInterval', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.SegmentDirection', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.SimulatorTime', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.SpeedCategory', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.TargetReportMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.TimeInterval', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.Trajectory', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.VehicleCategory', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.VisibilityLevel', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.WaypointType', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.PreferenceInterval, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.PreferenceInterval.displayName = 'proto.ProtobufAirTrafficSimulator.PreferenceInterval';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.PreferenceInterval.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.toObject = function(includeInstance, msg) {
  var f, obj = {
    maxearlier: (f = msg.getMaxearlier()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    maxlater: (f = msg.getMaxlater()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    costpersecondearlier: msg.getCostpersecondearlier(),
    costpersecondlater: msg.getCostpersecondlater()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.PreferenceInterval;
  return proto.ProtobufAirTrafficSimulator.PreferenceInterval.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setMaxearlier(value);
      break;
    case 2:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setMaxlater(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setCostpersecondearlier(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setCostpersecondlater(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMaxearlier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = this.getMaxlater();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = this.getCostpersecondearlier();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = this.getCostpersecondlater();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} The clone.
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional google.protobuf.Duration maxEarlier = 1;
 * @return {proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getMaxearlier = function() {
  return /** @type{proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 1));
};


/** @param {proto.google.protobuf.Duration|undefined} value  */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setMaxearlier = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.clearMaxearlier = function() {
  this.setMaxearlier(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.hasMaxearlier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.Duration maxLater = 2;
 * @return {proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getMaxlater = function() {
  return /** @type{proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 2));
};


/** @param {proto.google.protobuf.Duration|undefined} value  */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setMaxlater = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.clearMaxlater = function() {
  this.setMaxlater(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.hasMaxlater = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional float costPerSecondEarlier = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getCostpersecondearlier = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setCostpersecondearlier = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional float costPerSecondLater = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getCostpersecondlater = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setCostpersecondlater = function(value) {
  jspb.Message.setField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.Position4D = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.Position4D, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.Position4D.displayName = 'proto.ProtobufAirTrafficSimulator.Position4D';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Position4D.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Position4D} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position4D.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    latitude: msg.getLatitude(),
    longitude: msg.getLongitude(),
    altitude: msg.getAltitude()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D}
 */
proto.ProtobufAirTrafficSimulator.Position4D.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.Position4D;
  return proto.ProtobufAirTrafficSimulator.Position4D.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.Position4D} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D}
 */
proto.ProtobufAirTrafficSimulator.Position4D.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTime(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLatitude(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLongitude(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setAltitude(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Position4D} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Position4D.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getLatitude();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = this.getLongitude();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = this.getAltitude();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D} The clone.
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Position4D} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getTime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setTime = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.Position4D.prototype.clearTime = function() {
  this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float latitude = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getLatitude = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setLatitude = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional float longitude = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getLongitude = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setLongitude = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional float altitude = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getAltitude = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setAltitude = function(value) {
  jspb.Message.setField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.Position4DCartesian, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.Position4DCartesian.displayName = 'proto.ProtobufAirTrafficSimulator.Position4DCartesian';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Position4DCartesian.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    x: msg.getX(),
    y: msg.getY(),
    z: msg.getZ(),
    milestone: msg.getMilestone()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.Position4DCartesian;
  return proto.ProtobufAirTrafficSimulator.Position4DCartesian.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTime(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setX(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setY(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setZ(value);
      break;
    case 5:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (reader.readEnum());
      msg.setMilestone(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getX();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = this.getY();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = this.getZ();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = this.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} The clone.
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getTime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setTime = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.clearTime = function() {
  this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float x = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setX = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional float y = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setY = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional float z = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getZ = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setZ = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional Milestone milestone = 5;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.Milestone} value  */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setMilestone = function(value) {
  jspb.Message.setField(this, 5, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.PositionAtObject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.PositionAtObject.displayName = 'proto.ProtobufAirTrafficSimulator.PositionAtObject';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.PositionAtObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.PositionAtObject} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    objectid: msg.getObjectid(),
    objecttype: msg.getObjecttype(),
    milestone: msg.getMilestone()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.PositionAtObject;
  return proto.ProtobufAirTrafficSimulator.PositionAtObject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.PositionAtObject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTime(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setObjectid(value);
      break;
    case 3:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setObjecttype(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (reader.readEnum());
      msg.setMilestone(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.PositionAtObject} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getObjectid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = this.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject} The clone.
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PositionAtObject} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getTime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setTime = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.clearTime = function() {
  this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string objectId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getObjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setObjectid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional ObjectType objectType = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setObjecttype = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional Milestone milestone = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.Milestone} value  */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setMilestone = function(value) {
  jspb.Message.setField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.Position = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.Position, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.Position.displayName = 'proto.ProtobufAirTrafficSimulator.Position';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.Position.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.Position.PositionCase = {
  POSITION_NOT_SET: 0,
  POSITION4D: 1,
  POSITION4DCARTESIAN: 2,
  POSITIONATOBJECT: 3
};

/**
 * @return {proto.ProtobufAirTrafficSimulator.Position.PositionCase}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.getPositionCase = function() {
  return /** @type {proto.ProtobufAirTrafficSimulator.Position.PositionCase} */(jspb.Message.computeOneofCase(this, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Position} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position.toObject = function(includeInstance, msg) {
  var f, obj = {
    position4d: (f = msg.getPosition4d()) && proto.ProtobufAirTrafficSimulator.Position4D.toObject(includeInstance, f),
    position4dcartesian: (f = msg.getPosition4dcartesian()) && proto.ProtobufAirTrafficSimulator.Position4DCartesian.toObject(includeInstance, f),
    positionatobject: (f = msg.getPositionatobject()) && proto.ProtobufAirTrafficSimulator.PositionAtObject.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.Position.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.Position;
  return proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.Position} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.ProtobufAirTrafficSimulator.Position4D;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position4D.deserializeBinaryFromReader);
      msg.setPosition4d(value);
      break;
    case 2:
      var value = new proto.ProtobufAirTrafficSimulator.Position4DCartesian;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position4DCartesian.deserializeBinaryFromReader);
      msg.setPosition4dcartesian(value);
      break;
    case 3:
      var value = new proto.ProtobufAirTrafficSimulator.PositionAtObject;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.PositionAtObject.deserializeBinaryFromReader);
      msg.setPositionatobject(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Position} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getPosition4d();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.ProtobufAirTrafficSimulator.Position4D.serializeBinaryToWriter
    );
  }
  f = this.getPosition4dcartesian();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.ProtobufAirTrafficSimulator.Position4DCartesian.serializeBinaryToWriter
    );
  }
  f = this.getPositionatobject();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ProtobufAirTrafficSimulator.PositionAtObject.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.Position} The clone.
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Position} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Position4D position4D = 1;
 * @return {proto.ProtobufAirTrafficSimulator.Position4D}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.getPosition4d = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Position4D} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position4D, 1));
};


/** @param {proto.ProtobufAirTrafficSimulator.Position4D|undefined} value  */
proto.ProtobufAirTrafficSimulator.Position.prototype.setPosition4d = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_[0], value);
};


proto.ProtobufAirTrafficSimulator.Position.prototype.clearPosition4d = function() {
  this.setPosition4d(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.hasPosition4d = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Position4DCartesian position4DCartesian = 2;
 * @return {proto.ProtobufAirTrafficSimulator.Position4DCartesian}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.getPosition4dcartesian = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Position4DCartesian} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position4DCartesian, 2));
};


/** @param {proto.ProtobufAirTrafficSimulator.Position4DCartesian|undefined} value  */
proto.ProtobufAirTrafficSimulator.Position.prototype.setPosition4dcartesian = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_[0], value);
};


proto.ProtobufAirTrafficSimulator.Position.prototype.clearPosition4dcartesian = function() {
  this.setPosition4dcartesian(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.hasPosition4dcartesian = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional PositionAtObject positionAtObject = 3;
 * @return {proto.ProtobufAirTrafficSimulator.PositionAtObject}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.getPositionatobject = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.PositionAtObject} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.PositionAtObject, 3));
};


/** @param {proto.ProtobufAirTrafficSimulator.PositionAtObject|undefined} value  */
proto.ProtobufAirTrafficSimulator.Position.prototype.setPositionatobject = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_[0], value);
};


proto.ProtobufAirTrafficSimulator.Position.prototype.clearPositionatobject = function() {
  this.setPositionatobject(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.hasPositionatobject = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.displayName = 'proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject = function(includeInstance, msg) {
  var f, obj = {
    volumeid: msg.getVolumeid(),
    bottomflightlevel: msg.getBottomflightlevel(),
    topflightlevel: msg.getTopflightlevel()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference;
  return proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVolumeid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBottomflightlevel(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTopflightlevel(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getVolumeid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getBottomflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = this.getTopflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} The clone.
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string volumeId = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.getVolumeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.setVolumeid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int32 bottomFlightLevel = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.getBottomflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.setBottomflightlevel = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int32 topFlightLevel = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.getTopflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.setTopflightlevel = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.displayName = 'proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.toObject = function(includeInstance, msg) {
  var f, obj = {
    cornersList: jspb.Message.toObjectList(msg.getCornersList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    trianglesList: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface;
  return proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.getCornersList().push(value);
      msg.setCornersList(msg.getCornersList());
      break;
    case 2:
      var value = /** @type {!Array.<number>} */ (reader.readPackedInt32());
      msg.setTrianglesList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getCornersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = this.getTrianglesList();
  if (f.length > 0) {
    writer.writePackedInt32(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} The clone.
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated Position corners = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.getCornersList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 1));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.Position>} value  */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.setCornersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.clearCornersList = function() {
  this.setCornersList([]);
};


/**
 * repeated int32 triangles = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<number>}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.getTrianglesList = function() {
  return /** @type {!Array.<number>} */ (jspb.Message.getField(this, 2));
};


/** @param {Array.<number>} value  */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.setTrianglesList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.clearTrianglesList = function() {
  jspb.Message.setField(this, 2, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.Trajectory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.Trajectory.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.Trajectory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.Trajectory.displayName = 'proto.ProtobufAirTrafficSimulator.Trajectory';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.Trajectory.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Trajectory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Trajectory} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: msg.getId(),
    trajectoryList: jspb.Message.toObjectList(msg.getTrajectoryList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.Trajectory;
  return proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.Trajectory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.getTrajectoryList().push(value);
      msg.setTrajectoryList(msg.getTrajectoryList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Trajectory} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getTrajectoryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.Trajectory} The clone.
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Trajectory} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.setId = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated Position trajectory = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.getTrajectoryList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 2));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.Position>} value  */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.setTrajectoryList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.ProtobufAirTrafficSimulator.Trajectory.prototype.clearTrajectoryList = function() {
  this.setTrajectoryList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.InitialisationCompleted, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.InitialisationCompleted.displayName = 'proto.ProtobufAirTrafficSimulator.InitialisationCompleted';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.InitialisationCompleted.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.toObject = function(includeInstance, msg) {
  var f, obj = {
    completiontime: (f = msg.getCompletiontime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    numairspaceconfigs: msg.getNumairspaceconfigs(),
    numairspaces: msg.getNumairspaces(),
    numsectors: msg.getNumsectors(),
    numairblocks: msg.getNumairblocks(),
    numwaypoints: msg.getNumwaypoints()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.InitialisationCompleted;
  return proto.ProtobufAirTrafficSimulator.InitialisationCompleted.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setCompletiontime(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumairspaceconfigs(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumairspaces(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumsectors(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumairblocks(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumwaypoints(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getCompletiontime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getNumairspaceconfigs();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = this.getNumairspaces();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = this.getNumsectors();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = this.getNumairblocks();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = this.getNumwaypoints();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} The clone.
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional google.protobuf.Timestamp completionTime = 1;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getCompletiontime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setCompletiontime = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.clearCompletiontime = function() {
  this.setCompletiontime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.hasCompletiontime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 numAirspaceConfigs = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumairspaceconfigs = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumairspaceconfigs = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int32 numAirspaces = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumairspaces = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumairspaces = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional int32 numSectors = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumsectors = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumsectors = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional int32 numAirblocks = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumairblocks = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumairblocks = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional int32 numWaypoints = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumwaypoints = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumwaypoints = function(value) {
  jspb.Message.setField(this, 6, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.SimulatorTime, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.SimulatorTime.displayName = 'proto.ProtobufAirTrafficSimulator.SimulatorTime';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.SimulatorTime.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.SimulatorTime} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    speedfactor: msg.getSpeedfactor()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.SimulatorTime}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.SimulatorTime;
  return proto.ProtobufAirTrafficSimulator.SimulatorTime.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.SimulatorTime} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.SimulatorTime}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTime(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSpeedfactor(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.SimulatorTime} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getSpeedfactor();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.SimulatorTime} The clone.
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SimulatorTime} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.getTime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.setTime = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.clearTime = function() {
  this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float speedFactor = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.getSpeedfactor = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.setSpeedfactor = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.TargetReportMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.TargetReportMessage.displayName = 'proto.ProtobufAirTrafficSimulator.TargetReportMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.TargetReportMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    vehicleid: msg.getVehicleid(),
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    latitude: msg.getLatitude(),
    longitude: msg.getLongitude(),
    altitude: msg.getAltitude(),
    speed: msg.getSpeed(),
    bearing: msg.getBearing(),
    timestamp: (f = msg.getTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.TargetReportMessage;
  return proto.ProtobufAirTrafficSimulator.TargetReportMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setVehicleid(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTime(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLatitude(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLongitude(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setAltitude(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSpeed(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setBearing(value);
      break;
    case 9:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getVehicleid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getTime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getLatitude();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = this.getLongitude();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = this.getAltitude();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = this.getSpeed();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = this.getBearing();
  if (f !== 0.0) {
    writer.writeFloat(
      8,
      f
    );
  }
  f = this.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string vehicleId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getVehicleid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setVehicleid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional google.protobuf.Timestamp time = 3;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getTime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setTime = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.clearTime = function() {
  this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.hasTime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional float latitude = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getLatitude = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setLatitude = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional float longitude = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getLongitude = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setLongitude = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional float altitude = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getAltitude = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setAltitude = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional float speed = 7;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getSpeed = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 7, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setSpeed = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional float bearing = 8;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getBearing = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 8, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setBearing = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional google.protobuf.Timestamp timeStamp = 9;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getTimestamp = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 9));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setTimestamp = function(value) {
  jspb.Message.setWrapperField(this, 9, value);
};


proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.clearTimestamp = function() {
  this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 9) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.AllTargetReports.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.AllTargetReports, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.AllTargetReports.displayName = 'proto.ProtobufAirTrafficSimulator.AllTargetReports';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AllTargetReports.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AllTargetReports} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.toObject = function(includeInstance, msg) {
  var f, obj = {
    reportsList: jspb.Message.toObjectList(msg.getReportsList(),
    proto.ProtobufAirTrafficSimulator.TargetReportMessage.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.AllTargetReports}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.AllTargetReports;
  return proto.ProtobufAirTrafficSimulator.AllTargetReports.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.AllTargetReports} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.AllTargetReports}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.ProtobufAirTrafficSimulator.TargetReportMessage;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.TargetReportMessage.deserializeBinaryFromReader);
      msg.getReportsList().push(value);
      msg.setReportsList(msg.getReportsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AllTargetReports} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getReportsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.ProtobufAirTrafficSimulator.TargetReportMessage.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.AllTargetReports} The clone.
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AllTargetReports} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated TargetReportMessage reports = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.TargetReportMessage>}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.getReportsList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.TargetReportMessage>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.TargetReportMessage, 1));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.TargetReportMessage>} value  */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.setReportsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.clearReportsList = function() {
  this.setReportsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    flightuniqueid: msg.getFlightuniqueid(),
    planningstage: msg.getPlanningstage(),
    milestone: msg.getMilestone(),
    milestonetime: (f = msg.getMilestonetime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    preferenceinterval: (f = msg.getPreferenceinterval()) && proto.ProtobufAirTrafficSimulator.PreferenceInterval.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage;
  return proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightuniqueid(value);
      break;
    case 3:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (reader.readEnum());
      msg.setPlanningstage(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (reader.readEnum());
      msg.setMilestone(value);
      break;
    case 5:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setMilestonetime(value);
      break;
    case 6:
      var value = new proto.ProtobufAirTrafficSimulator.PreferenceInterval;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.PreferenceInterval.deserializeBinaryFromReader);
      msg.setPreferenceinterval(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getPlanningstage();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = this.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getMilestonetime();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getPreferenceinterval();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.ProtobufAirTrafficSimulator.PreferenceInterval.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setFlightuniqueid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional PlanningStage planningStage = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.PlanningStage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getPlanningstage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.PlanningStage} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setPlanningstage = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional Milestone milestone = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.Milestone} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setMilestone = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional google.protobuf.Timestamp milestoneTime = 5;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getMilestonetime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 5));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setMilestonetime = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.clearMilestonetime = function() {
  this.setMilestonetime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.hasMilestonetime = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional PreferenceInterval preferenceInterval = 6;
 * @return {proto.ProtobufAirTrafficSimulator.PreferenceInterval}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getPreferenceinterval = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.PreferenceInterval} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.PreferenceInterval, 6));
};


/** @param {proto.ProtobufAirTrafficSimulator.PreferenceInterval|undefined} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setPreferenceinterval = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.clearPreferenceinterval = function() {
  this.setPreferenceinterval(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.hasPreferenceinterval = function() {
  return jspb.Message.getField(this, 6) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    flightuniqueid: msg.getFlightuniqueid(),
    planningstage: msg.getPlanningstage(),
    milestone: msg.getMilestone(),
    position: (f = msg.getPosition()) && proto.ProtobufAirTrafficSimulator.PositionAtObject.toObject(includeInstance, f),
    preference: msg.getPreference(),
    timestampsent: (f = msg.getTimestampsent()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage;
  return proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightuniqueid(value);
      break;
    case 3:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (reader.readEnum());
      msg.setPlanningstage(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (reader.readEnum());
      msg.setMilestone(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.PositionAtObject;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.PositionAtObject.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setPreference(value);
      break;
    case 7:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTimestampsent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getPlanningstage();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = this.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getPosition();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.PositionAtObject.serializeBinaryToWriter
    );
  }
  f = this.getPreference();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = this.getTimestampsent();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setFlightuniqueid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional PlanningStage planningStage = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.PlanningStage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getPlanningstage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.PlanningStage} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setPlanningstage = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional Milestone milestone = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.Milestone} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setMilestone = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional PositionAtObject position = 5;
 * @return {proto.ProtobufAirTrafficSimulator.PositionAtObject}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getPosition = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.PositionAtObject} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.PositionAtObject, 5));
};


/** @param {proto.ProtobufAirTrafficSimulator.PositionAtObject|undefined} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setPosition = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.clearPosition = function() {
  this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional float preference = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getPreference = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setPreference = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional google.protobuf.Timestamp timeStampSent = 7;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getTimestampsent = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 7));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setTimestampsent = function(value) {
  jspb.Message.setWrapperField(this, 7, value);
};


proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.clearTimestampsent = function() {
  this.setTimestampsent(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.hasTimestampsent = function() {
  return jspb.Message.getField(this, 7) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.PlannedFlightMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.PlannedFlightMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    flightuniqueid: msg.getFlightuniqueid(),
    trajectory: (f = msg.getTrajectory()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    minimumrunwayseparation: (f = msg.getMinimumrunwayseparation()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    minimumflowseparation: (f = msg.getMinimumflowseparation()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.PlannedFlightMessage;
  return proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightuniqueid(value);
      break;
    case 3:
      var value = new proto.ProtobufAirTrafficSimulator.Trajectory;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinaryFromReader);
      msg.setTrajectory(value);
      break;
    case 4:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setMinimumrunwayseparation(value);
      break;
    case 5:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setMinimumflowseparation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getTrajectory();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = this.getMinimumrunwayseparation();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = this.getMinimumflowseparation();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setFlightuniqueid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional Trajectory trajectory = 3;
 * @return {proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getTrajectory = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 3));
};


/** @param {proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value  */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setTrajectory = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.clearTrajectory = function() {
  this.setTrajectory(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.hasTrajectory = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Duration minimumRunwaySeparation = 4;
 * @return {proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getMinimumrunwayseparation = function() {
  return /** @type{proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 4));
};


/** @param {proto.google.protobuf.Duration|undefined} value  */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setMinimumrunwayseparation = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.clearMinimumrunwayseparation = function() {
  this.setMinimumrunwayseparation(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.hasMinimumrunwayseparation = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.Duration minimumFlowSeparation = 5;
 * @return {proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getMinimumflowseparation = function() {
  return /** @type{proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 5));
};


/** @param {proto.google.protobuf.Duration|undefined} value  */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setMinimumflowseparation = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.clearMinimumflowseparation = function() {
  this.setMinimumflowseparation(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.hasMinimumflowseparation = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewAircraftMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewAircraftMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAircraftMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAircraftMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    aircraftid: msg.getAircraftid(),
    aircrafttype: msg.getAircrafttype(),
    waketurbulencecategory: msg.getWaketurbulencecategory()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewAircraftMessage;
  return proto.ProtobufAirTrafficSimulator.NewAircraftMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAircraftid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAircrafttype(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} */ (reader.readEnum());
      msg.setWaketurbulencecategory(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getAircraftid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getAircrafttype();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getWaketurbulencecategory();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string aircraftId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getAircraftid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setAircraftid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string aircraftType = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getAircrafttype = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setAircrafttype = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional WakeTurbulenceCategory wakeTurbulenceCategory = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getWaketurbulencecategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setWaketurbulencecategory = function(value) {
  jspb.Message.setField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    vehicletypeid: msg.getVehicletypeid(),
    preferredgroundspeed: msg.getPreferredgroundspeed(),
    maximumgroundspeed: msg.getMaximumgroundspeed(),
    minimumtakeoffdistance: msg.getMinimumtakeoffdistance(),
    wingspan: msg.getWingspan(),
    length: msg.getLength(),
    waketurbulencecategory: msg.getWaketurbulencecategory(),
    takeoffspeedcategory: msg.getTakeoffspeedcategory(),
    minstartuptime: (f = msg.getMinstartuptime()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    aircraftclass: msg.getAircraftclass(),
    height: msg.getHeight(),
    vehiclecategory: msg.getVehiclecategory()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage;
  return proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setVehicletypeid(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setPreferredgroundspeed(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMaximumgroundspeed(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMinimumtakeoffdistance(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setWingspan(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLength(value);
      break;
    case 8:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} */ (reader.readEnum());
      msg.setWaketurbulencecategory(value);
      break;
    case 9:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (reader.readEnum());
      msg.setTakeoffspeedcategory(value);
      break;
    case 10:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setMinstartuptime(value);
      break;
    case 11:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.AircraftClass} */ (reader.readEnum());
      msg.setAircraftclass(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHeight(value);
      break;
    case 13:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.VehicleCategory} */ (reader.readEnum());
      msg.setVehiclecategory(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getVehicletypeid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getPreferredgroundspeed();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = this.getMaximumgroundspeed();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = this.getMinimumtakeoffdistance();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = this.getWingspan();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = this.getLength();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = this.getWaketurbulencecategory();
  if (f !== 0.0) {
    writer.writeEnum(
      8,
      f
    );
  }
  f = this.getTakeoffspeedcategory();
  if (f !== 0.0) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = this.getMinstartuptime();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = this.getAircraftclass();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
  f = this.getHeight();
  if (f !== 0.0) {
    writer.writeFloat(
      12,
      f
    );
  }
  f = this.getVehiclecategory();
  if (f !== 0.0) {
    writer.writeEnum(
      13,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string vehicleTypeId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getVehicletypeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setVehicletypeid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional float preferredGroundSpeed = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getPreferredgroundspeed = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setPreferredgroundspeed = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional float maximumGroundSpeed = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getMaximumgroundspeed = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setMaximumgroundspeed = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional float minimumTakeOffDistance = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getMinimumtakeoffdistance = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setMinimumtakeoffdistance = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional float wingSpan = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getWingspan = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setWingspan = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional float length = 7;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getLength = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 7, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setLength = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional WakeTurbulenceCategory wakeTurbulenceCategory = 8;
 * @return {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getWaketurbulencecategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} */ (jspb.Message.getFieldProto3(this, 8, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setWaketurbulencecategory = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional SpeedCategory takeOffSpeedCategory = 9;
 * @return {!proto.ProtobufAirTrafficSimulator.SpeedCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getTakeoffspeedcategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (jspb.Message.getFieldProto3(this, 9, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.SpeedCategory} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setTakeoffspeedcategory = function(value) {
  jspb.Message.setField(this, 9, value);
};


/**
 * optional google.protobuf.Duration minStartUpTime = 10;
 * @return {proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getMinstartuptime = function() {
  return /** @type{proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 10));
};


/** @param {proto.google.protobuf.Duration|undefined} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setMinstartuptime = function(value) {
  jspb.Message.setWrapperField(this, 10, value);
};


proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.clearMinstartuptime = function() {
  this.setMinstartuptime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.hasMinstartuptime = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional AircraftClass aircraftClass = 11;
 * @return {!proto.ProtobufAirTrafficSimulator.AircraftClass}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getAircraftclass = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AircraftClass} */ (jspb.Message.getFieldProto3(this, 11, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.AircraftClass} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setAircraftclass = function(value) {
  jspb.Message.setField(this, 11, value);
};


/**
 * optional float height = 12;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 12, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setHeight = function(value) {
  jspb.Message.setField(this, 12, value);
};


/**
 * optional VehicleCategory vehicleCategory = 13;
 * @return {!proto.ProtobufAirTrafficSimulator.VehicleCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getVehiclecategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.VehicleCategory} */ (jspb.Message.getFieldProto3(this, 13, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.VehicleCategory} value  */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setVehiclecategory = function(value) {
  jspb.Message.setField(this, 13, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewFlightMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewFlightMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    flightuniqueid: msg.getFlightuniqueid(),
    callsign: msg.getCallsign(),
    departureairport: msg.getDepartureairport(),
    arrivalairport: msg.getArrivalairport(),
    aircraftid: msg.getAircraftid()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewFlightMessage;
  return proto.ProtobufAirTrafficSimulator.NewFlightMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightuniqueid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setCallsign(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDepartureairport(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setArrivalairport(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setAircraftid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getCallsign();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getDepartureairport();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = this.getArrivalairport();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = this.getAircraftid();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setFlightuniqueid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string callSign = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getCallsign = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setCallsign = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string departureAirport = 4;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getDepartureairport = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 4, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setDepartureairport = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string arrivalAirport = 5;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getArrivalairport = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 5, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setArrivalairport = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string aircraftId = 6;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getAircraftid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 6, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setAircraftid = function(value) {
  jspb.Message.setField(this, 6, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    flightuniqueid: msg.getFlightuniqueid(),
    statuscode: msg.getStatuscode()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage;
  return proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightuniqueid(value);
      break;
    case 3:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.FlightStatusCode} */ (reader.readEnum());
      msg.setStatuscode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getStatuscode();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.setFlightuniqueid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional FlightStatusCode statusCode = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCode}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.getStatuscode = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.FlightStatusCode} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.FlightStatusCode} value  */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.setStatuscode = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewRouteMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewRouteMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewRouteMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewRouteMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    networkid: msg.getNetworkid(),
    routeid: msg.getRouteid(),
    routetype: msg.getRoutetype(),
    trajectory: (f = msg.getTrajectory()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    speedcategory: msg.getSpeedcategory()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewRouteMessage;
  return proto.ProtobufAirTrafficSimulator.NewRouteMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNetworkid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setRouteid(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setRoutetype(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.Trajectory;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinaryFromReader);
      msg.setTrajectory(value);
      break;
    case 6:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (reader.readEnum());
      msg.setSpeedcategory(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getRouteid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getRoutetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getTrajectory();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = this.getSpeedcategory();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setNetworkid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string routeId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getRouteid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setRouteid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional ObjectType routeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getRoutetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setRoutetype = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional Trajectory trajectory = 5;
 * @return {proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getTrajectory = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/** @param {proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value  */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setTrajectory = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.clearTrajectory = function() {
  this.setTrajectory(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.hasTrajectory = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SpeedCategory speedCategory = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.SpeedCategory}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getSpeedcategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.SpeedCategory} value  */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setSpeedcategory = function(value) {
  jspb.Message.setField(this, 6, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.FlightRouteMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.FlightRouteMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightRouteMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightRouteMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    flightuniqueid: msg.getFlightuniqueid(),
    planningstage: msg.getPlanningstage(),
    routetype: msg.getRoutetype(),
    route: (f = msg.getRoute()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    preference: msg.getPreference()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.FlightRouteMessage;
  return proto.ProtobufAirTrafficSimulator.FlightRouteMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightuniqueid(value);
      break;
    case 3:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (reader.readEnum());
      msg.setPlanningstage(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setRoutetype(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.Trajectory;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinaryFromReader);
      msg.setRoute(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setPreference(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getPlanningstage();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = this.getRoutetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getRoute();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = this.getPreference();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setFlightuniqueid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional PlanningStage planningStage = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.PlanningStage}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getPlanningstage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.PlanningStage} value  */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setPlanningstage = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional ObjectType routeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getRoutetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setRoutetype = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional Trajectory route = 5;
 * @return {proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getRoute = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/** @param {proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value  */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setRoute = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.clearRoute = function() {
  this.setRoute(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.hasRoute = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional float preference = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getPreference = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setPreference = function(value) {
  jspb.Message.setField(this, 6, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    networkid: msg.getNetworkid(),
    routeid: msg.getRouteid(),
    routetype: msg.getRoutetype(),
    route: (f = msg.getRoute()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    speedcategory: msg.getSpeedcategory(),
    stand: (f = msg.getStand()) && proto.ProtobufAirTrafficSimulator.Position.toObject(includeInstance, f),
    endpushback: (f = msg.getEndpushback()) && proto.ProtobufAirTrafficSimulator.Position.toObject(includeInstance, f),
    bearing: msg.getBearing()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage;
  return proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNetworkid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setRouteid(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setRoutetype(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.Trajectory;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinaryFromReader);
      msg.setRoute(value);
      break;
    case 6:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (reader.readEnum());
      msg.setSpeedcategory(value);
      break;
    case 7:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.setStand(value);
      break;
    case 8:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.setEndpushback(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setBearing(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getRouteid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getRoutetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getRoute();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = this.getSpeedcategory();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = this.getStand();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = this.getEndpushback();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = this.getBearing();
  if (f !== 0.0) {
    writer.writeFloat(
      9,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setNetworkid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string routeId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getRouteid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setRouteid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional ObjectType routeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getRoutetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setRoutetype = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional Trajectory route = 5;
 * @return {proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getRoute = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/** @param {proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setRoute = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.clearRoute = function() {
  this.setRoute(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.hasRoute = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SpeedCategory speedCategory = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.SpeedCategory}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getSpeedcategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.SpeedCategory} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setSpeedcategory = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional Position stand = 7;
 * @return {proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getStand = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Position} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 7));
};


/** @param {proto.ProtobufAirTrafficSimulator.Position|undefined} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setStand = function(value) {
  jspb.Message.setWrapperField(this, 7, value);
};


proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.clearStand = function() {
  this.setStand(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.hasStand = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional Position endPushback = 8;
 * @return {proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getEndpushback = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Position} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 8));
};


/** @param {proto.ProtobufAirTrafficSimulator.Position|undefined} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setEndpushback = function(value) {
  jspb.Message.setWrapperField(this, 8, value);
};


proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.clearEndpushback = function() {
  this.setEndpushback(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.hasEndpushback = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional float bearing = 9;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getBearing = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 9, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setBearing = function(value) {
  jspb.Message.setField(this, 9, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewAirspaceMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirspaceMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    airspaceid: msg.getAirspaceid(),
    includedairspacevolumesList: jspb.Message.toObjectList(msg.getIncludedairspacevolumesList(),
    proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject, includeInstance),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    description: msg.getDescription(),
    objecttype: msg.getObjecttype()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewAirspaceMessage;
  return proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAirspaceid(value);
      break;
    case 3:
      var value = new proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.deserializeBinaryFromReader);
      msg.getIncludedairspacevolumesList().push(value);
      msg.setIncludedairspacevolumesList(msg.getIncludedairspacevolumesList());
      break;
    case 4:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.getAreaList().push(value);
      msg.setAreaList(msg.getAreaList());
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 6:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setObjecttype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getAirspaceid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getIncludedairspacevolumesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter
    );
  }
  f = this.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = this.getDescription();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = this.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string airspaceId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getAirspaceid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setAirspaceid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * repeated AirspaceVolumeReference includedAirspaceVolumes = 3;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getIncludedairspacevolumesList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, 3));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setIncludedairspacevolumesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.clearIncludedairspacevolumesList = function() {
  this.setIncludedairspacevolumesList([]);
};


/**
 * repeated Position area = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getAreaList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 4));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.Position>} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setAreaList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.clearAreaList = function() {
  this.setAreaList([]);
};


/**
 * optional string description = 5;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 5, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setDescription = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional ObjectType objectType = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setObjecttype = function(value) {
  jspb.Message.setField(this, 6, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.NewSectorMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewSectorMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewSectorMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewSectorMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.repeatedFields_ = [4,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewSectorMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    sectorid: msg.getSectorid(),
    description: msg.getDescription(),
    includedairspacevolumesList: jspb.Message.toObjectList(msg.getIncludedairspacevolumesList(),
    proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject, includeInstance),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    objecttype: msg.getObjecttype()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewSectorMessage;
  return proto.ProtobufAirTrafficSimulator.NewSectorMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectorid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = new proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.deserializeBinaryFromReader);
      msg.getIncludedairspacevolumesList().push(value);
      msg.setIncludedairspacevolumesList(msg.getIncludedairspacevolumesList());
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.getAreaList().push(value);
      msg.setAreaList(msg.getAreaList());
      break;
    case 6:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setObjecttype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getSectorid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getIncludedairspacevolumesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter
    );
  }
  f = this.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = this.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string sectorId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getSectorid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setSectorid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setDescription = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * repeated AirspaceVolumeReference includedAirspaceVolumes = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getIncludedairspacevolumesList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, 4));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} value  */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setIncludedairspacevolumesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.clearIncludedairspacevolumesList = function() {
  this.setIncludedairspacevolumesList([]);
};


/**
 * repeated Position area = 5;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getAreaList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 5));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.Position>} value  */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setAreaList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.clearAreaList = function() {
  this.setAreaList([]);
};


/**
 * optional ObjectType objectType = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setObjecttype = function(value) {
  jspb.Message.setField(this, 6, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewAirBlockMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirBlockMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    airblockid: msg.getAirblockid(),
    description: msg.getDescription(),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    bottomflightlevel: msg.getBottomflightlevel(),
    topflightlevel: msg.getTopflightlevel(),
    objecttype: msg.getObjecttype()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewAirBlockMessage;
  return proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAirblockid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.getAreaList().push(value);
      msg.setAreaList(msg.getAreaList());
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBottomflightlevel(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTopflightlevel(value);
      break;
    case 7:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setObjecttype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getAirblockid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = this.getBottomflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = this.getTopflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = this.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string airBlockId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getAirblockid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setAirblockid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setDescription = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * repeated Position area = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getAreaList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 4));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.Position>} value  */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setAreaList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.clearAreaList = function() {
  this.setAreaList([]);
};


/**
 * optional int32 bottomFlightLevel = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getBottomflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setBottomflightlevel = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional int32 topFlightLevel = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getTopflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setTopflightlevel = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional ObjectType objectType = 7;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 7, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setObjecttype = function(value) {
  jspb.Message.setField(this, 7, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.repeatedFields_ = [5,6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    configurationid: msg.getConfigurationid(),
    description: msg.getDescription(),
    includedairspacevolumesList: jspb.Message.toObjectList(msg.getIncludedairspacevolumesList(),
    proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject, includeInstance),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    objecttype: msg.getObjecttype()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage;
  return proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setConfigurationid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.deserializeBinaryFromReader);
      msg.getIncludedairspacevolumesList().push(value);
      msg.setIncludedairspacevolumesList(msg.getIncludedairspacevolumesList());
      break;
    case 6:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.getAreaList().push(value);
      msg.setAreaList(msg.getAreaList());
      break;
    case 7:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setObjecttype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getConfigurationid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getIncludedairspacevolumesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter
    );
  }
  f = this.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = this.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string configurationId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getConfigurationid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setConfigurationid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setDescription = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * repeated AirspaceVolumeReference includedAirspaceVolumes = 5;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getIncludedairspacevolumesList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, 5));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setIncludedairspacevolumesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.clearIncludedairspacevolumesList = function() {
  this.setIncludedairspacevolumesList([]);
};


/**
 * repeated Position area = 6;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getAreaList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 6));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.Position>} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setAreaList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 6, value);
};


proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.clearAreaList = function() {
  this.setAreaList([]);
};


/**
 * optional ObjectType objectType = 7;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 7, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setObjecttype = function(value) {
  jspb.Message.setField(this, 7, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.TimeInterval = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.TimeInterval, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.TimeInterval.displayName = 'proto.ProtobufAirTrafficSimulator.TimeInterval';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.TimeInterval.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.TimeInterval} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.toObject = function(includeInstance, msg) {
  var f, obj = {
    starttime: (f = msg.getStarttime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    endttime: (f = msg.getEndttime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.TimeInterval}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.TimeInterval;
  return proto.ProtobufAirTrafficSimulator.TimeInterval.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.TimeInterval} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.TimeInterval}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setStarttime(value);
      break;
    case 2:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setEndttime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.TimeInterval} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getStarttime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getEndttime();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.TimeInterval} The clone.
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.TimeInterval} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional google.protobuf.Timestamp starttime = 1;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.getStarttime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.setStarttime = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.clearStarttime = function() {
  this.setStarttime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.hasStarttime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.Timestamp endttime = 2;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.getEndttime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 2));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.setEndttime = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.clearEndttime = function() {
  this.setEndttime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.TimeInterval.prototype.hasEndttime = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.displayName = 'proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    airspaceid: msg.getAirspaceid(),
    starttime: (f = msg.getStarttime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    endtime: (f = msg.getEndtime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage;
  return proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAirspaceid(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setStarttime(value);
      break;
    case 4:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setEndtime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getAirspaceid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getStarttime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = this.getEndtime();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string airspaceId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getAirspaceid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setAirspaceid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional google.protobuf.Timestamp startTime = 3;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getStarttime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setStarttime = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.clearStarttime = function() {
  this.setStarttime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.hasStarttime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Timestamp endTime = 4;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getEndtime = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setEndtime = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.clearEndtime = function() {
  this.setEndtime(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.hasEndtime = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.displayName = 'proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    objectid: msg.getObjectid(),
    timeintervalsList: jspb.Message.toObjectList(msg.getTimeintervalsList(),
    proto.ProtobufAirTrafficSimulator.TimeInterval.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage;
  return proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setObjectid(value);
      break;
    case 3:
      var value = new proto.ProtobufAirTrafficSimulator.TimeInterval;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.TimeInterval.deserializeBinaryFromReader);
      msg.getTimeintervalsList().push(value);
      msg.setTimeintervalsList(msg.getTimeintervalsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getObjectid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getTimeintervalsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.ProtobufAirTrafficSimulator.TimeInterval.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string objectId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.getObjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.setObjectid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * repeated TimeInterval timeIntervals = 3;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.TimeInterval>}
 */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.getTimeintervalsList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.TimeInterval>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.TimeInterval, 3));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.TimeInterval>} value  */
proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.setTimeintervalsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


proto.ProtobufAirTrafficSimulator.AvailabilityIntervalsMessage.prototype.clearTimeintervalsList = function() {
  this.setTimeintervalsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewSegmentMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewSegmentMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewSegmentMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewSegmentMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    networkid: msg.getNetworkid(),
    segmentid: msg.getSegmentid(),
    segmenttype: msg.getSegmenttype(),
    points: (f = msg.getPoints()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    curvature: msg.getCurvature(),
    direction: msg.getDirection()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewSegmentMessage;
  return proto.ProtobufAirTrafficSimulator.NewSegmentMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNetworkid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSegmentid(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.NetworkResourceType} */ (reader.readEnum());
      msg.setSegmenttype(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.Trajectory;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Trajectory.deserializeBinaryFromReader);
      msg.setPoints(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setCurvature(value);
      break;
    case 7:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.SegmentDirection} */ (reader.readEnum());
      msg.setDirection(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getSegmentid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getSegmenttype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getPoints();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = this.getCurvature();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = this.getDirection();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setNetworkid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string segmentId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getSegmentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setSegmentid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional NetworkResourceType segmentType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.NetworkResourceType}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getSegmenttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NetworkResourceType} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.NetworkResourceType} value  */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setSegmenttype = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional Trajectory points = 5;
 * @return {proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getPoints = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/** @param {proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value  */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setPoints = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.clearPoints = function() {
  this.setPoints(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.hasPoints = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional float curvature = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getCurvature = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setCurvature = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional SegmentDirection direction = 7;
 * @return {!proto.ProtobufAirTrafficSimulator.SegmentDirection}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getDirection = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SegmentDirection} */ (jspb.Message.getFieldProto3(this, 7, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.SegmentDirection} value  */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setDirection = function(value) {
  jspb.Message.setField(this, 7, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.NewWaypointMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewWaypointMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewWaypointMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewWaypointMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewWaypointMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    networkid: msg.getNetworkid(),
    objectid: msg.getObjectid(),
    objecttype: msg.getObjecttype(),
    waypointtype: msg.getWaypointtype(),
    pointsList: jspb.Message.getField(msg, 6)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewWaypointMessage;
  return proto.ProtobufAirTrafficSimulator.NewWaypointMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNetworkid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setObjectid(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setObjecttype(value);
      break;
    case 5:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.WaypointType} */ (reader.readEnum());
      msg.setWaypointtype(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.getPointsList().push(value);
      msg.setPointsList(msg.getPointsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getObjectid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getWaypointtype();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = this.getPointsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setNetworkid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string objectId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getObjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setObjectid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional ObjectType objectType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setObjecttype = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional WaypointType waypointType = 5;
 * @return {!proto.ProtobufAirTrafficSimulator.WaypointType}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getWaypointtype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.WaypointType} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.WaypointType} value  */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setWaypointtype = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * repeated string points = 6;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<string>}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getPointsList = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.getField(this, 6));
};


/** @param {Array.<string>} value  */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setPointsList = function(value) {
  jspb.Message.setField(this, 6, value || []);
};


proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.clearPointsList = function() {
  jspb.Message.setField(this, 6, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewPointMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewPointMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewPointMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewPointMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewPointMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: msg.getXmlelementname(),
    networkid: msg.getNetworkid(),
    nodeid: msg.getNodeid(),
    nodetype: msg.getNodetype(),
    position: (f = msg.getPosition()) && proto.ProtobufAirTrafficSimulator.Position.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewPointMessage;
  return proto.ProtobufAirTrafficSimulator.NewPointMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewPointMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setXmlelementname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNetworkid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNodeid(value);
      break;
    case 4:
      var value = /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (reader.readEnum());
      msg.setNodetype(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.setPosition(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewPointMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getNodeid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getNodetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getPosition();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewPointMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setXmlelementname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setNetworkid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string nodeId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getNodeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setNodeid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional ObjectType nodeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getNodetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value  */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setNodetype = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional Position position = 5;
 * @return {proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getPosition = function() {
  return /** @type{proto.ProtobufAirTrafficSimulator.Position} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 5));
};


/** @param {proto.ProtobufAirTrafficSimulator.Position|undefined} value  */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setPosition = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.clearPosition = function() {
  this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.displayName = 'proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.repeatedFields_ = [4,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    rolename: msg.getRolename(),
    sectortocontrol: msg.getSectortocontrol(),
    actualidofsectortocontrol: msg.getActualidofsectortocontrol(),
    acceptedflightsList: jspb.Message.getField(msg, 4),
    tentativeflightsList: jspb.Message.getField(msg, 5)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage;
  return proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRolename(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectortocontrol(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setActualidofsectortocontrol(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.getAcceptedflightsList().push(value);
      msg.setAcceptedflightsList(msg.getAcceptedflightsList());
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.getTentativeflightsList().push(value);
      msg.setTentativeflightsList(msg.getTentativeflightsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getRolename();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getSectortocontrol();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getActualidofsectortocontrol();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getAcceptedflightsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = this.getTentativeflightsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string roleName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getRolename = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setRolename = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string sectorToControl = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getSectortocontrol = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setSectortocontrol = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string actualIdOfSectorToControl = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getActualidofsectortocontrol = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setActualidofsectortocontrol = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * repeated string acceptedFlights = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<string>}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getAcceptedflightsList = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.getField(this, 4));
};


/** @param {Array.<string>} value  */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setAcceptedflightsList = function(value) {
  jspb.Message.setField(this, 4, value || []);
};


proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.clearAcceptedflightsList = function() {
  jspb.Message.setField(this, 4, []);
};


/**
 * repeated string tentativeFlights = 5;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<string>}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getTentativeflightsList = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.getField(this, 5));
};


/** @param {Array.<string>} value  */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setTentativeflightsList = function(value) {
  jspb.Message.setField(this, 5, value || []);
};


proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.clearTentativeflightsList = function() {
  jspb.Message.setField(this, 5, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.displayName = 'proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    currentairspaceconfiguration: msg.getCurrentairspaceconfiguration()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage;
  return proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrentairspaceconfiguration(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getCurrentairspaceconfiguration();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string CurrentAirspaceConfiguration = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.getCurrentairspaceconfiguration = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.setCurrentairspaceconfiguration = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    airspacevolumeid: msg.getAirspacevolumeid(),
    belongstoairspaceconfigid: msg.getBelongstoairspaceconfigid(),
    numberofvolumesinconfig: msg.getNumberofvolumesinconfig(),
    tesselatedsurfacesList: jspb.Message.toObjectList(msg.getTesselatedsurfacesList(),
    proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage;
  return proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAirspacevolumeid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBelongstoairspaceconfigid(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumberofvolumesinconfig(value);
      break;
    case 4:
      var value = new proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.deserializeBinaryFromReader);
      msg.getTesselatedsurfacesList().push(value);
      msg.setTesselatedsurfacesList(msg.getTesselatedsurfacesList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAirspacevolumeid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getBelongstoairspaceconfigid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getNumberofvolumesinconfig();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = this.getTesselatedsurfacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string airspaceVolumeId = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getAirspacevolumeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setAirspacevolumeid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string belongsToAirspaceConfigId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getBelongstoairspaceconfigid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setBelongstoairspaceconfigid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int32 numberOfVolumesInConfig = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getNumberofvolumesinconfig = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setNumberofvolumesinconfig = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * repeated TesselatedSectorSurface tesselatedSurfaces = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface>}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getTesselatedsurfacesList = function() {
  return /** @type{!Array.<!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface, 4));
};


/** @param {Array.<!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface>} value  */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setTesselatedsurfacesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.clearTesselatedsurfacesList = function() {
  this.setTesselatedsurfacesList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.repeatedFields_, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    airspacevolumeid: msg.getAirspacevolumeid(),
    flightsinvolumeList: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage;
  return proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAirspacevolumeid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.getFlightsinvolumeList().push(value);
      msg.setFlightsinvolumeList(msg.getFlightsinvolumeList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAirspacevolumeid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getFlightsinvolumeList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string airspaceVolumeId = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.getAirspacevolumeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.setAirspacevolumeid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated string flightsInVolume = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<string>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.getFlightsinvolumeList = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.getField(this, 2));
};


/** @param {Array.<string>} value  */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.setFlightsinvolumeList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.clearFlightsinvolumeList = function() {
  jspb.Message.setField(this, 2, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    fromcontrollableairspacevolume: msg.getFromcontrollableairspacevolume(),
    tocontrollableairspacevolume: msg.getTocontrollableairspacevolume(),
    flightid: msg.getFlightid(),
    timestamp: (f = msg.getTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage;
  return proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFromcontrollableairspacevolume(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTocontrollableairspacevolume(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightid(value);
      break;
    case 4:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getFromcontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getTocontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getFlightid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string fromControllableAirspaceVolume = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getFromcontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setFromcontrollableairspacevolume = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string toControllableAirspaceVolume = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getTocontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setTocontrollableairspacevolume = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string flightId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getFlightid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setFlightid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional google.protobuf.Timestamp timeStamp = 4;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getTimestamp = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setTimestamp = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.clearTimestamp = function() {
  this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    fromcontrollableairspacevolume: msg.getFromcontrollableairspacevolume(),
    tocontrollableairspacevolume: msg.getTocontrollableairspacevolume(),
    flightid: msg.getFlightid(),
    timestamp: (f = msg.getTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage;
  return proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFromcontrollableairspacevolume(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTocontrollableairspacevolume(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFlightid(value);
      break;
    case 4:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getFromcontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getTocontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getFlightid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} The clone.
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.cloneMessage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string fromControllableAirspaceVolume = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getFromcontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setFromcontrollableairspacevolume = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string toControllableAirspaceVolume = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getTocontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setTocontrollableairspacevolume = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string flightId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getFlightid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setFlightid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional google.protobuf.Timestamp timeStamp = 4;
 * @return {proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getTimestamp = function() {
  return /** @type{proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/** @param {proto.google.protobuf.Timestamp|undefined} value  */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setTimestamp = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.clearTimestamp = function() {
  this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.PlanningStage = {
  REFERENCE: 0,
  TARGET: 1,
  PLAN: 2,
  CLEARED: 3,
  ACTUAL: 4
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.Milestone = {
  M_NONE: 0,
  OFFBLOCK: 1,
  END_PUSHBACK: 2,
  M_RUNWAY_ENTRY: 3,
  M_TAKE_OFF: 4,
  LEAVING_DEPARTURE_T_M_A: 5,
  ENTERING_ARRIVAL_T_M_A: 6,
  METERING_FIX: 7,
  FINAL_APPROACH: 8,
  M_LANDING: 9,
  M_RUNWAY_EXIT: 10,
  INBLOCK: 11
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.VehicleCategory = {
  VC_UNKNOWN: 0,
  AIRCRAFT: 1,
  GROUND_VEHICLE: 2
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCode = {
  FS_NONE: 0,
  SCHEDULED: 1,
  ACTIVE: 2,
  REDIRECTED: 3,
  DIVERTED: 4,
  CANCELLED: 5,
  COMPLETED: 6,
  PENDING: 7
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.ObjectType = {
  OT_UNKNOWN: 0,
  AIRPORT_NETWORK: 1,
  TERMINAL_MANOEUVRING_AREA: 2,
  OT_POINT: 3,
  OT_SEGMENT: 4,
  OT_STAND_MANOEUVRE: 5,
  TAXI_ROUTE: 6,
  OT_DEPARTURE_ROUTE: 7,
  OT_ARRIVAL_ROUTE: 8,
  OT_STAND: 9,
  WAYPOINT: 10,
  OT_RUNWAY: 11,
  RUNWAY_ORIENTATION: 12,
  AIRPORT: 13,
  AIRSPACE: 14,
  AIRSPACE_CONFIGURATION: 15,
  SECTOR: 16,
  AIR_BLOCK: 17
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.WaypointType = {
  WT_NONE: 0,
  GATE: 1,
  WT_STAND: 2,
  PUSHBACK_POINT: 3,
  INTERSECTION: 4,
  WT_HOLDING_POINT: 5,
  WT_DEICING_AREA: 6,
  WT_CLEARANCE_BAR: 7,
  RUNWAY_NODE: 8,
  WT_RUNWAY_ENTRY: 9,
  WT_RUNWAY_EXIT: 10,
  RUNWAY_THRESHOLD: 11,
  WT_IN_FLIGHT: 12
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.NetworkResourceType = {
  NRT_UNKNOWN: 0,
  NRT_POINT: 1,
  NRT_SEGMENT: 2,
  NRT_STAND: 3,
  NRT_STAND_MANOEUVRE: 4,
  APRON: 5,
  TAXIWAY: 6,
  NRT_RUNWAY: 7,
  NTR_ARRIVAL_ROUTE: 8,
  NTR_DEPARTURE_ROUTE: 9,
  NTR_HOLDING_POINT: 10,
  NTR_CLEARANCE_BAR: 11,
  NTR_DEICING_AREA: 12,
  ROAD: 13,
  ARRIVAL_OR_DEPARTURE_ROUTE: 14,
  NTR_ANY: 15
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.ActivityType = {
  AT_UNKNOWN: 0,
  GROUND: 1,
  TOWING: 2,
  TAXI_OUT: 3,
  TAXI_IN: 4,
  AT_TAKE_OFF: 5,
  AT_LANDING: 6,
  AT_IN_FLIGHT: 7,
  RUNWAY_INSPECTION: 8,
  AT_ALL: 9
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.SegmentDirection = {
  SD_NONE: 0,
  START_TO_END: 1,
  END_TO_START: 2,
  SD_ALL: 3
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.AccessType = {
  CLOSED: 0,
  ARRIVALS: 1,
  DEPARTURES: 2,
  OPEN: 3
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.SpeedCategory = {
  SC_UNKNOWN: 0,
  SLOW: 1,
  FAST: 2,
  SC_ALL: 3
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory = {
  WTC_UNKNOWN: 0,
  WTC_LIGHT: 1,
  LOWER_MEDIUM: 2,
  UPPER_MEDIUM: 3,
  LOWER_HEAVY: 4,
  UPPER_HEAVY: 5,
  JUMBO: 6,
  WTC_ALL: 7
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.AviationFlightCategory = {
  V_M_C: 0,
  MARGINAL_V_M_C: 1,
  I_M_C: 2,
  MARGINAL_I_M_C: 3
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.DeIcingLevel = {
  DIL_NONE: 0,
  DIL_LIGHT: 1,
  MODERATE: 2,
  SEVERE: 3,
  EXTREME: 4
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.VisibilityLevel = {
  HIGH: 0,
  LOW: 1
};

/**
 * @enum {number}
 */
proto.ProtobufAirTrafficSimulator.AircraftClass = {
  ACC_NONE: 0,
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6
};

goog.object.extend(exports, proto.ProtobufAirTrafficSimulator);
