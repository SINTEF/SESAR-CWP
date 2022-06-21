// source: ProtobufAirTrafficSimulator.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
goog.object.extend(proto, google_protobuf_duration_pb);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AccessType', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.ActivityType', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AircraftClass', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference', null, global);
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.AllTargetReports', null, global);
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
goog.exportSymbol('proto.ProtobufAirTrafficSimulator.Position.PositionCase', null, global);
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.PreferenceInterval.displayName = 'proto.ProtobufAirTrafficSimulator.PreferenceInterval';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.Position4D.displayName = 'proto.ProtobufAirTrafficSimulator.Position4D';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.Position4DCartesian.displayName = 'proto.ProtobufAirTrafficSimulator.Position4DCartesian';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.PositionAtObject.displayName = 'proto.ProtobufAirTrafficSimulator.PositionAtObject';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.Position.displayName = 'proto.ProtobufAirTrafficSimulator.Position';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.displayName = 'proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.displayName = 'proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.Trajectory.displayName = 'proto.ProtobufAirTrafficSimulator.Trajectory';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.InitialisationCompleted.displayName = 'proto.ProtobufAirTrafficSimulator.InitialisationCompleted';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.SimulatorTime.displayName = 'proto.ProtobufAirTrafficSimulator.SimulatorTime';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.TargetReportMessage.displayName = 'proto.ProtobufAirTrafficSimulator.TargetReportMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.AllTargetReports.displayName = 'proto.ProtobufAirTrafficSimulator.AllTargetReports';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.PlannedFlightMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewAircraftMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAircraftMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewFlightMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewRouteMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewRouteMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.FlightRouteMessage.displayName = 'proto.ProtobufAirTrafficSimulator.FlightRouteMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirspaceMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewSectorMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewSectorMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirBlockMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.displayName = 'proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewSegmentMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewSegmentMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewWaypointMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewWaypointMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewPointMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewPointMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.displayName = 'proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.displayName = 'proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.displayName = 'proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.displayName = 'proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage';
}
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
  /**
   * @public
   * @override
   */
  proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.displayName = 'proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.PreferenceInterval.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.toObject = function(includeInstance, msg) {
  var f, obj = {
    maxearlier: (f = msg.getMaxearlier()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    maxlater: (f = msg.getMaxlater()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    costpersecondearlier: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    costpersecondlater: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.PreferenceInterval.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMaxearlier();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = message.getMaxlater();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = message.getCostpersecondearlier();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getCostpersecondlater();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
};


/**
 * optional google.protobuf.Duration maxEarlier = 1;
 * @return {?proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getMaxearlier = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 1));
};


/**
 * @param {?proto.google.protobuf.Duration|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} returns this
*/
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setMaxearlier = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} returns this
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.clearMaxearlier = function() {
  return this.setMaxearlier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.hasMaxearlier = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.Duration maxLater = 2;
 * @return {?proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getMaxlater = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 2));
};


/**
 * @param {?proto.google.protobuf.Duration|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} returns this
*/
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setMaxlater = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} returns this
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.clearMaxlater = function() {
  return this.setMaxlater(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.hasMaxlater = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional float costPerSecondEarlier = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getCostpersecondearlier = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} returns this
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setCostpersecondearlier = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float costPerSecondLater = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.getCostpersecondlater = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.PreferenceInterval} returns this
 */
proto.ProtobufAirTrafficSimulator.PreferenceInterval.prototype.setCostpersecondlater = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Position4D.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Position4D} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.Position4D.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    latitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    longitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    altitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.Position4D.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Position4D} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.Position4D.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getLatitude();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getLongitude();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getAltitude();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D} returns this
*/
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setTime = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.clearTime = function() {
  return this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float latitude = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getLatitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setLatitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional float longitude = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getLongitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setLongitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float altitude = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.getAltitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4D} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4D.prototype.setAltitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Position4DCartesian.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    x: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    y: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    z: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    milestone: jspb.Message.getFieldWithDefault(msg, 5, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.Position4DCartesian.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getX();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getZ();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} returns this
*/
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setTime = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.clearTime = function() {
  return this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float x = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional float y = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float z = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getZ = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setZ = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional Milestone milestone = 5;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Milestone} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position4DCartesian} returns this
 */
proto.ProtobufAirTrafficSimulator.Position4DCartesian.prototype.setMilestone = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.PositionAtObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.PositionAtObject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    objectid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    objecttype: jspb.Message.getFieldWithDefault(msg, 3, 0),
    milestone: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.PositionAtObject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.PositionAtObject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getObjectid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject} returns this
*/
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setTime = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject} returns this
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.clearTime = function() {
  return this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string objectId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getObjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject} returns this
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setObjectid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ObjectType objectType = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject} returns this
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setObjecttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional Milestone milestone = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Milestone} value
 * @return {!proto.ProtobufAirTrafficSimulator.PositionAtObject} returns this
 */
proto.ProtobufAirTrafficSimulator.PositionAtObject.prototype.setMilestone = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};



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
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Position.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Position} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Position} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPosition4d();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.ProtobufAirTrafficSimulator.Position4D.serializeBinaryToWriter
    );
  }
  f = message.getPosition4dcartesian();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.ProtobufAirTrafficSimulator.Position4DCartesian.serializeBinaryToWriter
    );
  }
  f = message.getPositionatobject();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ProtobufAirTrafficSimulator.PositionAtObject.serializeBinaryToWriter
    );
  }
};


/**
 * optional Position4D position4D = 1;
 * @return {?proto.ProtobufAirTrafficSimulator.Position4D}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.getPosition4d = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Position4D} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position4D, 1));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Position4D|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position} returns this
*/
proto.ProtobufAirTrafficSimulator.Position.prototype.setPosition4d = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.Position} returns this
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.clearPosition4d = function() {
  return this.setPosition4d(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.hasPosition4d = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Position4DCartesian position4DCartesian = 2;
 * @return {?proto.ProtobufAirTrafficSimulator.Position4DCartesian}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.getPosition4dcartesian = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Position4DCartesian} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position4DCartesian, 2));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Position4DCartesian|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position} returns this
*/
proto.ProtobufAirTrafficSimulator.Position.prototype.setPosition4dcartesian = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.Position} returns this
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.clearPosition4dcartesian = function() {
  return this.setPosition4dcartesian(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.hasPosition4dcartesian = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional PositionAtObject positionAtObject = 3;
 * @return {?proto.ProtobufAirTrafficSimulator.PositionAtObject}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.getPositionatobject = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.PositionAtObject} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.PositionAtObject, 3));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.PositionAtObject|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.Position} returns this
*/
proto.ProtobufAirTrafficSimulator.Position.prototype.setPositionatobject = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.ProtobufAirTrafficSimulator.Position.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.Position} returns this
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.clearPositionatobject = function() {
  return this.setPositionatobject(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.Position.prototype.hasPositionatobject = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject = function(includeInstance, msg) {
  var f, obj = {
    volumeid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    bottomflightlevel: jspb.Message.getFieldWithDefault(msg, 2, 0),
    topflightlevel: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVolumeid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBottomflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTopflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional string volumeId = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.getVolumeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} returns this
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.setVolumeid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 bottomFlightLevel = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.getBottomflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} returns this
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.setBottomflightlevel = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 topFlightLevel = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.getTopflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference} returns this
 */
proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.prototype.setTopflightlevel = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.toObject = function(includeInstance, msg) {
  var f, obj = {
    cornersList: jspb.Message.toObjectList(msg.getCornersList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    trianglesList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
      msg.addCorners(value);
      break;
    case 2:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt32() : [reader.readInt32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addTriangles(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCornersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = message.getTrianglesList();
  if (f.length > 0) {
    writer.writePackedInt32(
      2,
      f
    );
  }
};


/**
 * repeated Position corners = 1;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.getCornersList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 1));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.Position>} value
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} returns this
*/
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.setCornersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Position=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.addCorners = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.ProtobufAirTrafficSimulator.Position, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.clearCornersList = function() {
  return this.setCornersList([]);
};


/**
 * repeated int32 triangles = 2;
 * @return {!Array<number>}
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.getTrianglesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.setTrianglesList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.addTriangles = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.prototype.clearTrianglesList = function() {
  return this.setTrianglesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.Trajectory.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.Trajectory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.Trajectory} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.Trajectory.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
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
      msg.addTrajectory(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.Trajectory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTrajectoryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.Trajectory} returns this
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated Position trajectory = 2;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.getTrajectoryList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 2));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.Position>} value
 * @return {!proto.ProtobufAirTrafficSimulator.Trajectory} returns this
*/
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.setTrajectoryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Position=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.addTrajectory = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.ProtobufAirTrafficSimulator.Position, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.Trajectory} returns this
 */
proto.ProtobufAirTrafficSimulator.Trajectory.prototype.clearTrajectoryList = function() {
  return this.setTrajectoryList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.InitialisationCompleted.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.toObject = function(includeInstance, msg) {
  var f, obj = {
    completiontime: (f = msg.getCompletiontime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    numairspaceconfigs: jspb.Message.getFieldWithDefault(msg, 2, 0),
    numairspaces: jspb.Message.getFieldWithDefault(msg, 3, 0),
    numsectors: jspb.Message.getFieldWithDefault(msg, 4, 0),
    numairblocks: jspb.Message.getFieldWithDefault(msg, 5, 0),
    numwaypoints: jspb.Message.getFieldWithDefault(msg, 6, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.InitialisationCompleted.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCompletiontime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getNumairspaceconfigs();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getNumairspaces();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getNumsectors();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getNumairblocks();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getNumwaypoints();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
};


/**
 * optional google.protobuf.Timestamp completionTime = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getCompletiontime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} returns this
*/
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setCompletiontime = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} returns this
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.clearCompletiontime = function() {
  return this.setCompletiontime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.hasCompletiontime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 numAirspaceConfigs = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumairspaceconfigs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} returns this
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumairspaceconfigs = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 numAirspaces = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumairspaces = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} returns this
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumairspaces = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 numSectors = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumsectors = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} returns this
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumsectors = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 numAirblocks = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumairblocks = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} returns this
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumairblocks = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 numWaypoints = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.getNumwaypoints = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.InitialisationCompleted} returns this
 */
proto.ProtobufAirTrafficSimulator.InitialisationCompleted.prototype.setNumwaypoints = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.SimulatorTime.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.SimulatorTime} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    speedfactor: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.SimulatorTime.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.SimulatorTime} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getSpeedfactor();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.getTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.SimulatorTime} returns this
*/
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.setTime = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.SimulatorTime} returns this
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.clearTime = function() {
  return this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float speedFactor = 2;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.getSpeedfactor = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.SimulatorTime} returns this
 */
proto.ProtobufAirTrafficSimulator.SimulatorTime.prototype.setSpeedfactor = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.TargetReportMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    vehicleid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    latitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    longitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    altitude: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    speed: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    bearing: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.TargetReportMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVehicleid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getLatitude();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getLongitude();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getAltitude();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getSpeed();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = message.getBearing();
  if (f !== 0.0) {
    writer.writeFloat(
      8,
      f
    );
  }
  f = message.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string vehicleId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getVehicleid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setVehicleid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional google.protobuf.Timestamp time = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setTime = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.clearTime = function() {
  return this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.hasTime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional float latitude = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getLatitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setLatitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional float longitude = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getLongitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setLongitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float altitude = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getAltitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setAltitude = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional float speed = 7;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getSpeed = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setSpeed = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional float bearing = 8;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getBearing = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setBearing = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};


/**
 * optional google.protobuf.Timestamp timeStamp = 9;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.getTimestamp = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 9));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.setTimestamp = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.clearTimestamp = function() {
  return this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.TargetReportMessage.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 9) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AllTargetReports.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AllTargetReports} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
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
      msg.addReports(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.AllTargetReports.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AllTargetReports} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReportsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.ProtobufAirTrafficSimulator.TargetReportMessage.serializeBinaryToWriter
    );
  }
};


/**
 * repeated TargetReportMessage reports = 1;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.TargetReportMessage>}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.getReportsList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.TargetReportMessage>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.TargetReportMessage, 1));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.TargetReportMessage>} value
 * @return {!proto.ProtobufAirTrafficSimulator.AllTargetReports} returns this
*/
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.setReportsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.TargetReportMessage=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.TargetReportMessage}
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.addReports = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.ProtobufAirTrafficSimulator.TargetReportMessage, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.AllTargetReports} returns this
 */
proto.ProtobufAirTrafficSimulator.AllTargetReports.prototype.clearReportsList = function() {
  return this.setReportsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    flightuniqueid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    planningstage: jspb.Message.getFieldWithDefault(msg, 3, 0),
    milestone: jspb.Message.getFieldWithDefault(msg, 4, 0),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPlanningstage();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getMilestonetime();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getPreferenceinterval();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.ProtobufAirTrafficSimulator.PreferenceInterval.serializeBinaryToWriter
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setFlightuniqueid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional PlanningStage planningStage = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.PlanningStage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getPlanningstage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.PlanningStage} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setPlanningstage = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional Milestone milestone = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Milestone} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setMilestone = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional google.protobuf.Timestamp milestoneTime = 5;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getMilestonetime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 5));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setMilestonetime = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.clearMilestonetime = function() {
  return this.setMilestonetime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.hasMilestonetime = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional PreferenceInterval preferenceInterval = 6;
 * @return {?proto.ProtobufAirTrafficSimulator.PreferenceInterval}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.getPreferenceinterval = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.PreferenceInterval} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.PreferenceInterval, 6));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.PreferenceInterval|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.setPreferenceinterval = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.clearPreferenceinterval = function() {
  return this.setPreferenceinterval(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestoneTimeMessage.prototype.hasPreferenceinterval = function() {
  return jspb.Message.getField(this, 6) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    flightuniqueid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    planningstage: jspb.Message.getFieldWithDefault(msg, 3, 0),
    milestone: jspb.Message.getFieldWithDefault(msg, 4, 0),
    position: (f = msg.getPosition()) && proto.ProtobufAirTrafficSimulator.PositionAtObject.toObject(includeInstance, f),
    preference: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPlanningstage();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getMilestone();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.PositionAtObject.serializeBinaryToWriter
    );
  }
  f = message.getPreference();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getTimestampsent();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setFlightuniqueid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional PlanningStage planningStage = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.PlanningStage}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getPlanningstage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.PlanningStage} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setPlanningstage = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional Milestone milestone = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.Milestone}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getMilestone = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.Milestone} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Milestone} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setMilestone = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional PositionAtObject position = 5;
 * @return {?proto.ProtobufAirTrafficSimulator.PositionAtObject}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getPosition = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.PositionAtObject} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.PositionAtObject, 5));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.PositionAtObject|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setPosition = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional float preference = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getPreference = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setPreference = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional google.protobuf.Timestamp timeStampSent = 7;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.getTimestampsent = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 7));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.setTimestampsent = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.clearTimestampsent = function() {
  return this.setTimestampsent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightMilestonePositionMessage.prototype.hasTimestampsent = function() {
  return jspb.Message.getField(this, 7) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    flightuniqueid: jspb.Message.getFieldWithDefault(msg, 2, ""),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTrajectory();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = message.getMinimumrunwayseparation();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = message.getMinimumflowseparation();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setFlightuniqueid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Trajectory trajectory = 3;
 * @return {?proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getTrajectory = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 3));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setTrajectory = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.clearTrajectory = function() {
  return this.setTrajectory(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.hasTrajectory = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Duration minimumRunwaySeparation = 4;
 * @return {?proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getMinimumrunwayseparation = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 4));
};


/**
 * @param {?proto.google.protobuf.Duration|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setMinimumrunwayseparation = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.clearMinimumrunwayseparation = function() {
  return this.setMinimumrunwayseparation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.hasMinimumrunwayseparation = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.Duration minimumFlowSeparation = 5;
 * @return {?proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.getMinimumflowseparation = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 5));
};


/**
 * @param {?proto.google.protobuf.Duration|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.setMinimumflowseparation = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.PlannedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.clearMinimumflowseparation = function() {
  return this.setMinimumflowseparation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.PlannedFlightMessage.prototype.hasMinimumflowseparation = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAircraftMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    aircraftid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    aircrafttype: jspb.Message.getFieldWithDefault(msg, 3, ""),
    waketurbulencecategory: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewAircraftMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAircraftid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAircrafttype();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getWaketurbulencecategory();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string aircraftId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getAircraftid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setAircraftid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string aircraftType = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getAircrafttype = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setAircrafttype = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional WakeTurbulenceCategory wakeTurbulenceCategory = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.getWaketurbulencecategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftMessage.prototype.setWaketurbulencecategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    vehicletypeid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    preferredgroundspeed: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    maximumgroundspeed: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    minimumtakeoffdistance: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    wingspan: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    length: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    waketurbulencecategory: jspb.Message.getFieldWithDefault(msg, 8, 0),
    takeoffspeedcategory: jspb.Message.getFieldWithDefault(msg, 9, 0),
    minstartuptime: (f = msg.getMinstartuptime()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    aircraftclass: jspb.Message.getFieldWithDefault(msg, 11, 0),
    height: jspb.Message.getFloatingPointFieldWithDefault(msg, 12, 0.0),
    vehiclecategory: jspb.Message.getFieldWithDefault(msg, 13, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVehicletypeid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPreferredgroundspeed();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getMaximumgroundspeed();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getMinimumtakeoffdistance();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getWingspan();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getLength();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = message.getWaketurbulencecategory();
  if (f !== 0.0) {
    writer.writeEnum(
      8,
      f
    );
  }
  f = message.getTakeoffspeedcategory();
  if (f !== 0.0) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = message.getMinstartuptime();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = message.getAircraftclass();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
  f = message.getHeight();
  if (f !== 0.0) {
    writer.writeFloat(
      12,
      f
    );
  }
  f = message.getVehiclecategory();
  if (f !== 0.0) {
    writer.writeEnum(
      13,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string vehicleTypeId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getVehicletypeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setVehicletypeid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional float preferredGroundSpeed = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getPreferredgroundspeed = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setPreferredgroundspeed = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float maximumGroundSpeed = 4;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getMaximumgroundspeed = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setMaximumgroundspeed = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional float minimumTakeOffDistance = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getMinimumtakeoffdistance = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setMinimumtakeoffdistance = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float wingSpan = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getWingspan = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setWingspan = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional float length = 7;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getLength = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setLength = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional WakeTurbulenceCategory wakeTurbulenceCategory = 8;
 * @return {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getWaketurbulencecategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.WakeTurbulenceCategory} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setWaketurbulencecategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 8, value);
};


/**
 * optional SpeedCategory takeOffSpeedCategory = 9;
 * @return {!proto.ProtobufAirTrafficSimulator.SpeedCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getTakeoffspeedcategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.SpeedCategory} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setTakeoffspeedcategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 9, value);
};


/**
 * optional google.protobuf.Duration minStartUpTime = 10;
 * @return {?proto.google.protobuf.Duration}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getMinstartuptime = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 10));
};


/**
 * @param {?proto.google.protobuf.Duration|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setMinstartuptime = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.clearMinstartuptime = function() {
  return this.setMinstartuptime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.hasMinstartuptime = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional AircraftClass aircraftClass = 11;
 * @return {!proto.ProtobufAirTrafficSimulator.AircraftClass}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getAircraftclass = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.AircraftClass} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.AircraftClass} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setAircraftclass = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional float height = 12;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 12, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setHeight = function(value) {
  return jspb.Message.setProto3FloatField(this, 12, value);
};


/**
 * optional VehicleCategory vehicleCategory = 13;
 * @return {!proto.ProtobufAirTrafficSimulator.VehicleCategory}
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.getVehiclecategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.VehicleCategory} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.VehicleCategory} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAircraftTypeMessage.prototype.setVehiclecategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 13, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    flightuniqueid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    callsign: jspb.Message.getFieldWithDefault(msg, 3, ""),
    departureairport: jspb.Message.getFieldWithDefault(msg, 4, ""),
    arrivalairport: jspb.Message.getFieldWithDefault(msg, 5, ""),
    aircraftid: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewFlightMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCallsign();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDepartureairport();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getArrivalairport();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAircraftid();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setFlightuniqueid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string callSign = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getCallsign = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setCallsign = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string departureAirport = 4;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getDepartureairport = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setDepartureairport = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string arrivalAirport = 5;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getArrivalairport = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setArrivalairport = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string aircraftId = 6;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.getAircraftid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewFlightMessage.prototype.setAircraftid = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    flightuniqueid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    statuscode: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStatuscode();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.setFlightuniqueid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional FlightStatusCode statusCode = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCode}
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.getStatuscode = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.FlightStatusCode} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.FlightStatusCode} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightStatusCodeMessage.prototype.setStatuscode = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewRouteMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    networkid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    routeid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    routetype: jspb.Message.getFieldWithDefault(msg, 4, 0),
    trajectory: (f = msg.getTrajectory()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    speedcategory: jspb.Message.getFieldWithDefault(msg, 6, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewRouteMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRouteid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getRoutetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getTrajectory();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = message.getSpeedcategory();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setNetworkid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string routeId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getRouteid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setRouteid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional ObjectType routeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getRoutetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setRoutetype = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional Trajectory trajectory = 5;
 * @return {?proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getTrajectory = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setTrajectory = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.clearTrajectory = function() {
  return this.setTrajectory(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.hasTrajectory = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SpeedCategory speedCategory = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.SpeedCategory}
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.getSpeedcategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.SpeedCategory} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewRouteMessage.prototype.setSpeedcategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.FlightRouteMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    flightuniqueid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    planningstage: jspb.Message.getFieldWithDefault(msg, 3, 0),
    routetype: jspb.Message.getFieldWithDefault(msg, 4, 0),
    route: (f = msg.getRoute()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    preference: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.FlightRouteMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFlightuniqueid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPlanningstage();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getRoutetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getRoute();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = message.getPreference();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string flightUniqueId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getFlightuniqueid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setFlightuniqueid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional PlanningStage planningStage = 3;
 * @return {!proto.ProtobufAirTrafficSimulator.PlanningStage}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getPlanningstage = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.PlanningStage} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.PlanningStage} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setPlanningstage = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional ObjectType routeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getRoutetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setRoutetype = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional Trajectory route = 5;
 * @return {?proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getRoute = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setRoute = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.clearRoute = function() {
  return this.setRoute(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.hasRoute = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional float preference = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.getPreference = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.FlightRouteMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.FlightRouteMessage.prototype.setPreference = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    networkid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    routeid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    routetype: jspb.Message.getFieldWithDefault(msg, 4, 0),
    route: (f = msg.getRoute()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    speedcategory: jspb.Message.getFieldWithDefault(msg, 6, 0),
    stand: (f = msg.getStand()) && proto.ProtobufAirTrafficSimulator.Position.toObject(includeInstance, f),
    endpushback: (f = msg.getEndpushback()) && proto.ProtobufAirTrafficSimulator.Position.toObject(includeInstance, f),
    bearing: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRouteid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getRoutetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getRoute();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = message.getSpeedcategory();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = message.getStand();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = message.getEndpushback();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = message.getBearing();
  if (f !== 0.0) {
    writer.writeFloat(
      9,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setNetworkid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string routeId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getRouteid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setRouteid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional ObjectType routeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getRoutetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setRoutetype = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional Trajectory route = 5;
 * @return {?proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getRoute = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setRoute = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.clearRoute = function() {
  return this.setRoute(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.hasRoute = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SpeedCategory speedCategory = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.SpeedCategory}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getSpeedcategory = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SpeedCategory} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.SpeedCategory} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setSpeedcategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};


/**
 * optional Position stand = 7;
 * @return {?proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getStand = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Position} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 7));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Position|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setStand = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.clearStand = function() {
  return this.setStand(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.hasStand = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional Position endPushback = 8;
 * @return {?proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getEndpushback = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Position} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 8));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Position|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setEndpushback = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.clearEndpushback = function() {
  return this.setEndpushback(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.hasEndpushback = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional float bearing = 9;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.getBearing = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewStandManoeuvreMessage.prototype.setBearing = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    airspaceid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    includedairspacevolumesList: jspb.Message.toObjectList(msg.getIncludedairspacevolumesList(),
    proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject, includeInstance),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    description: jspb.Message.getFieldWithDefault(msg, 5, ""),
    objecttype: jspb.Message.getFieldWithDefault(msg, 6, 0)
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
      msg.addIncludedairspacevolumes(value);
      break;
    case 4:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.addArea(value);
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAirspaceid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getIncludedairspacevolumesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter
    );
  }
  f = message.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string airspaceId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getAirspaceid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setAirspaceid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated AirspaceVolumeReference includedAirspaceVolumes = 3;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getIncludedairspacevolumesList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, 3));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setIncludedairspacevolumesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.addIncludedairspacevolumes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.clearIncludedairspacevolumesList = function() {
  return this.setIncludedairspacevolumesList([]);
};


/**
 * repeated Position area = 4;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getAreaList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 4));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.Position>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setAreaList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Position=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.addArea = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.ProtobufAirTrafficSimulator.Position, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.clearAreaList = function() {
  return this.setAreaList([]);
};


/**
 * optional string description = 5;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional ObjectType objectType = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceMessage.prototype.setObjecttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.repeatedFields_ = [4,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewSectorMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sectorid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 3, ""),
    includedairspacevolumesList: jspb.Message.toObjectList(msg.getIncludedairspacevolumesList(),
    proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject, includeInstance),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    objecttype: jspb.Message.getFieldWithDefault(msg, 6, 0)
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
      msg.addIncludedairspacevolumes(value);
      break;
    case 5:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.addArea(value);
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewSectorMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSectorid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getIncludedairspacevolumesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter
    );
  }
  f = message.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = message.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string sectorId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getSectorid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setSectorid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated AirspaceVolumeReference includedAirspaceVolumes = 4;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getIncludedairspacevolumesList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, 4));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setIncludedairspacevolumesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.addIncludedairspacevolumes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.clearIncludedairspacevolumesList = function() {
  return this.setIncludedairspacevolumesList([]);
};


/**
 * repeated Position area = 5;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getAreaList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 5));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.Position>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setAreaList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Position=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.addArea = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.ProtobufAirTrafficSimulator.Position, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.clearAreaList = function() {
  return this.setAreaList([]);
};


/**
 * optional ObjectType objectType = 6;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSectorMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSectorMessage.prototype.setObjecttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    airblockid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 3, ""),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    bottomflightlevel: jspb.Message.getFieldWithDefault(msg, 5, 0),
    topflightlevel: jspb.Message.getFieldWithDefault(msg, 6, 0),
    objecttype: jspb.Message.getFieldWithDefault(msg, 7, 0)
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
      msg.addArea(value);
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAirblockid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = message.getBottomflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getTopflightlevel();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string airBlockId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getAirblockid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setAirblockid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated Position area = 4;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getAreaList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 4));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.Position>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setAreaList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Position=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.addArea = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.ProtobufAirTrafficSimulator.Position, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.clearAreaList = function() {
  return this.setAreaList([]);
};


/**
 * optional int32 bottomFlightLevel = 5;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getBottomflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setBottomflightlevel = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 topFlightLevel = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getTopflightlevel = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setTopflightlevel = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional ObjectType objectType = 7;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirBlockMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirBlockMessage.prototype.setObjecttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.repeatedFields_ = [5,6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    configurationid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 3, ""),
    includedairspacevolumesList: jspb.Message.toObjectList(msg.getIncludedairspacevolumesList(),
    proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.toObject, includeInstance),
    areaList: jspb.Message.toObjectList(msg.getAreaList(),
    proto.ProtobufAirTrafficSimulator.Position.toObject, includeInstance),
    objecttype: jspb.Message.getFieldWithDefault(msg, 7, 0)
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
      msg.addIncludedairspacevolumes(value);
      break;
    case 6:
      var value = new proto.ProtobufAirTrafficSimulator.Position;
      reader.readMessage(value,proto.ProtobufAirTrafficSimulator.Position.deserializeBinaryFromReader);
      msg.addArea(value);
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getConfigurationid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getIncludedairspacevolumesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference.serializeBinaryToWriter
    );
  }
  f = message.getAreaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
  f = message.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string configurationId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getConfigurationid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setConfigurationid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated AirspaceVolumeReference includedAirspaceVolumes = 5;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getIncludedairspacevolumesList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, 5));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setIncludedairspacevolumesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.addIncludedairspacevolumes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.ProtobufAirTrafficSimulator.AirspaceVolumeReference, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.clearIncludedairspacevolumesList = function() {
  return this.setIncludedairspacevolumesList([]);
};


/**
 * repeated Position area = 6;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.Position>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getAreaList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.Position>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 6));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.Position>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setAreaList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.Position=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.addArea = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.ProtobufAirTrafficSimulator.Position, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.clearAreaList = function() {
  return this.setAreaList([]);
};


/**
 * optional ObjectType objectType = 7;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceConfigurationMessage.prototype.setObjecttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    airspaceid: jspb.Message.getFieldWithDefault(msg, 2, ""),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAirspaceid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStarttime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getEndtime();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string airspaceId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getAirspaceid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setAirspaceid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional google.protobuf.Timestamp startTime = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getStarttime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setStarttime = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.clearStarttime = function() {
  return this.setStarttime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.hasStarttime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Timestamp endTime = 4;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.getEndtime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.setEndtime = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.clearEndtime = function() {
  return this.setEndtime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.AirspaceAvailabilityMessage.prototype.hasEndtime = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewSegmentMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    networkid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    segmentid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    segmenttype: jspb.Message.getFieldWithDefault(msg, 4, 0),
    points: (f = msg.getPoints()) && proto.ProtobufAirTrafficSimulator.Trajectory.toObject(includeInstance, f),
    curvature: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    direction: jspb.Message.getFieldWithDefault(msg, 7, 0)
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewSegmentMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSegmentid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSegmenttype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getPoints();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Trajectory.serializeBinaryToWriter
    );
  }
  f = message.getCurvature();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getDirection();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setNetworkid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string segmentId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getSegmentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setSegmentid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional NetworkResourceType segmentType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.NetworkResourceType}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getSegmenttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.NetworkResourceType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.NetworkResourceType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setSegmenttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional Trajectory points = 5;
 * @return {?proto.ProtobufAirTrafficSimulator.Trajectory}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getPoints = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Trajectory} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Trajectory, 5));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Trajectory|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setPoints = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.clearPoints = function() {
  return this.setPoints(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.hasPoints = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional float curvature = 6;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getCurvature = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setCurvature = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional SegmentDirection direction = 7;
 * @return {!proto.ProtobufAirTrafficSimulator.SegmentDirection}
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.getDirection = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.SegmentDirection} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.SegmentDirection} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewSegmentMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewSegmentMessage.prototype.setDirection = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewWaypointMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    networkid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    objectid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    objecttype: jspb.Message.getFieldWithDefault(msg, 4, 0),
    waypointtype: jspb.Message.getFieldWithDefault(msg, 5, 0),
    pointsList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f
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
      msg.addPoints(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewWaypointMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getObjectid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getObjecttype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getWaypointtype();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getPointsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setNetworkid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string objectId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getObjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setObjectid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional ObjectType objectType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getObjecttype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setObjecttype = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional WaypointType waypointType = 5;
 * @return {!proto.ProtobufAirTrafficSimulator.WaypointType}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getWaypointtype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.WaypointType} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.WaypointType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setWaypointtype = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * repeated string points = 6;
 * @return {!Array<string>}
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.getPointsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.setPointsList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.addPoints = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewWaypointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewWaypointMessage.prototype.clearPointsList = function() {
  return this.setPointsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewPointMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewPointMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    xmlelementname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    networkid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    nodeid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    nodetype: jspb.Message.getFieldWithDefault(msg, 4, 0),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewPointMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewPointMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getXmlelementname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNetworkid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNodeid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getNodetype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getPosition();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.ProtobufAirTrafficSimulator.Position.serializeBinaryToWriter
    );
  }
};


/**
 * optional string xmlElementName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getXmlelementname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setXmlelementname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string networkId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getNetworkid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setNetworkid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string nodeId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getNodeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setNodeid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional ObjectType nodeType = 4;
 * @return {!proto.ProtobufAirTrafficSimulator.ObjectType}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getNodetype = function() {
  return /** @type {!proto.ProtobufAirTrafficSimulator.ObjectType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.ObjectType} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setNodetype = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional Position position = 5;
 * @return {?proto.ProtobufAirTrafficSimulator.Position}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.getPosition = function() {
  return /** @type{?proto.ProtobufAirTrafficSimulator.Position} */ (
    jspb.Message.getWrapperField(this, proto.ProtobufAirTrafficSimulator.Position, 5));
};


/**
 * @param {?proto.ProtobufAirTrafficSimulator.Position|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.setPosition = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.NewPointMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.clearPosition = function() {
  return this.setPosition(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.NewPointMessage.prototype.hasPosition = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.repeatedFields_ = [4,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    rolename: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sectortocontrol: jspb.Message.getFieldWithDefault(msg, 2, ""),
    actualidofsectortocontrol: jspb.Message.getFieldWithDefault(msg, 3, ""),
    acceptedflightsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
    tentativeflightsList: (f = jspb.Message.getRepeatedField(msg, 5)) == null ? undefined : f
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
      msg.addAcceptedflights(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.addTentativeflights(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRolename();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSectortocontrol();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getActualidofsectortocontrol();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAcceptedflightsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = message.getTentativeflightsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
};


/**
 * optional string roleName = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getRolename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setRolename = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string sectorToControl = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getSectortocontrol = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setSectortocontrol = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string actualIdOfSectorToControl = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getActualidofsectortocontrol = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setActualidofsectortocontrol = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated string acceptedFlights = 4;
 * @return {!Array<string>}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getAcceptedflightsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setAcceptedflightsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.addAcceptedflights = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.clearAcceptedflightsList = function() {
  return this.setAcceptedflightsList([]);
};


/**
 * repeated string tentativeFlights = 5;
 * @return {!Array<string>}
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.getTentativeflightsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 5));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.setTentativeflightsList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.addTentativeflights = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.RoleConfigurationMessage.prototype.clearTentativeflightsList = function() {
  return this.setTentativeflightsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    currentairspaceconfiguration: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCurrentairspaceconfiguration();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string CurrentAirspaceConfiguration = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.getCurrentairspaceconfiguration = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.CurrentAirspaceConfigurationMessage.prototype.setCurrentairspaceconfiguration = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    airspacevolumeid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    belongstoairspaceconfigid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    numberofvolumesinconfig: jspb.Message.getFieldWithDefault(msg, 3, 0),
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
      msg.addTesselatedsurfaces(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAirspacevolumeid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBelongstoairspaceconfigid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNumberofvolumesinconfig();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getTesselatedsurfacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface.serializeBinaryToWriter
    );
  }
};


/**
 * optional string airspaceVolumeId = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getAirspacevolumeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setAirspacevolumeid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string belongsToAirspaceConfigId = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getBelongstoairspaceconfigid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setBelongstoairspaceconfigid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 numberOfVolumesInConfig = 3;
 * @return {number}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getNumberofvolumesinconfig = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setNumberofvolumesinconfig = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated TesselatedSectorSurface tesselatedSurfaces = 4;
 * @return {!Array<!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface>}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.getTesselatedsurfacesList = function() {
  return /** @type{!Array<!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface, 4));
};


/**
 * @param {!Array<!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface>} value
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.setTesselatedsurfacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface}
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.addTesselatedsurfaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.ProtobufAirTrafficSimulator.TesselatedSectorSurface, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.TesselatedAirspaceVolumeMessage.prototype.clearTesselatedsurfacesList = function() {
  return this.setTesselatedsurfacesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    airspacevolumeid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    flightsinvolumeList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
      msg.addFlightsinvolume(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAirspacevolumeid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFlightsinvolumeList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string airspaceVolumeId = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.getAirspacevolumeid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.setAirspacevolumeid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string flightsInVolume = 2;
 * @return {!Array<string>}
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.getFlightsinvolumeList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.setFlightsinvolumeList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.addFlightsinvolume = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.NewAirspaceVolumeFlightListMessage.prototype.clearFlightsinvolumeList = function() {
  return this.setFlightsinvolumeList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    fromcontrollableairspacevolume: jspb.Message.getFieldWithDefault(msg, 1, ""),
    tocontrollableairspacevolume: jspb.Message.getFieldWithDefault(msg, 2, ""),
    flightid: jspb.Message.getFieldWithDefault(msg, 3, ""),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFromcontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTocontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getFlightid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string fromControllableAirspaceVolume = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getFromcontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setFromcontrollableairspacevolume = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string toControllableAirspaceVolume = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getTocontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setTocontrollableairspacevolume = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string flightId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getFlightid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setFlightid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional google.protobuf.Timestamp timeStamp = 4;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.getTimestamp = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.setTimestamp = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.clearTimestamp = function() {
  return this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ProtobufAirTrafficSimulator.AddAcceptedFlightMessage.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    fromcontrollableairspacevolume: jspb.Message.getFieldWithDefault(msg, 1, ""),
    tocontrollableairspacevolume: jspb.Message.getFieldWithDefault(msg, 2, ""),
    flightid: jspb.Message.getFieldWithDefault(msg, 3, ""),
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
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFromcontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTocontrollableairspacevolume();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getFlightid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string fromControllableAirspaceVolume = 1;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getFromcontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setFromcontrollableairspacevolume = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string toControllableAirspaceVolume = 2;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getTocontrollableairspacevolume = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setTocontrollableairspacevolume = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string flightId = 3;
 * @return {string}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getFlightid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setFlightid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional google.protobuf.Timestamp timeStamp = 4;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.getTimestamp = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} returns this
*/
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.setTimestamp = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage} returns this
 */
proto.ProtobufAirTrafficSimulator.AddTentativeFlightMessage.prototype.clearTimestamp = function() {
  return this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
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
