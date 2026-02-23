import { z } from "zod";

/**
 * Pilot request types as received from the IIS over MQTT.
 * Note: these numeric values differ from the protobuf PilotRequestTypes enum,
 * which is used for simulator communication only.
 */
export enum PilotRequestType {
	FlightLevel = 0,
	Direct = 1,
	AbsoluteHeading = 2,
	RelativeHeading = 3,
}

/**
 * Schema for conflict coordination within required_coordinations.
 */
const ConflictCoordinationSchema = z.object({
	conflict_id: z.string(),
	mach_number: z.number(),
	min_separation: z.number(),
	distance_to_exit: z.number(),
	first_flight_id_at_CPA: z.string(),
	conflict_FL: z.number(),
	compatible: z.boolean(),
});

/**
 * A coordination item can be either a string or a conflict object.
 */
const CoordinationItemSchema = z.union([
	z.string(),
	ConflictCoordinationSchema,
]);

/**
 * Schema for goal results.
 */
const GoalResultsSchema = z.object({
	exit_level: z.number(),
	initial_climb: z.number(),
	exit_problems_are_manageable: z.boolean(),
	traffic_complexity_manageable: z.boolean(),
	required_coordinations: z.array(CoordinationItemSchema),
	higher_level_available: z.boolean(),
	is_conform_to_flight_plan: z.boolean(),
	next_sector: z.string(),
	next_sector_capacity_ok: z.boolean(),
	altitude_restriction: z.boolean(),
});

/**
 * Schema for a level-change goal entry (request_type is FlightLevel or Direct).
 */
const LevelChangeGoalSchema = z.object({
	RFL: z.number(),
	results: GoalResultsSchema.optional(),
});

/**
 * Schema for a conflict object within In_sector_conflicts of a heading goal.
 * Note: different shape from ConflictCoordinationSchema (level-change conflicts).
 */
const HeadingConflictSchema = z.object({
	conflict_id: z.string(),
	mach_number: z.number(),
	min_separation: z.number(),
	distance_from_intersection_to_exit: z.number(),
	first_call_sign_at_the_exit: z.string().nullable(),
	conflict_FL: z.number(),
});

/**
 * Schema for a heading goal entry (request_type is AbsoluteHeading or RelativeHeading).
 */
const HeadingGoalSchema = z.object({
	Req_hdg_value: z.number(),
	next_sector: z.string(),
	In_sector_conflicts: z.array(z.union([z.string(), HeadingConflictSchema])),
	Is_heading_found: z.boolean(),
});

/**
 * A goal can be either a level-change goal or a heading goal.
 */
const GoalSchema = z.union([LevelChangeGoalSchema, HeadingGoalSchema]);

/**
 * Schema for the request context.
 * Note: request_parameter can be a number (e.g., flight level 390) or a string (e.g., waypoint name "LEKFA" for DIRECTTO requests).
 */
const RequestContextSchema = z.object({
	request_id: z.string(),
	flight_id: z.string(),
	request_type: z.number(),
	request_parameter: z.union([z.number(), z.string()]),
});

/**
 * Main schema for the pilot request JSON message.
 */
export const PilotRequestJsonSchema = z.object({
	timestamp: z.string(),
	iteration_count: z.number(),
	context: RequestContextSchema,
	goals: z.array(GoalSchema),
});

/**
 * TypeScript type inferred from the schema.
 */
export type PilotRequestJson = z.infer<typeof PilotRequestJsonSchema>;

/** Maps a raw request_type number to a PilotRequestType enum value. */
export function getPilotRequestType(requestType: number): PilotRequestType {
	switch (requestType) {
		case PilotRequestType.FlightLevel:
			return PilotRequestType.FlightLevel;
		case PilotRequestType.Direct:
			return PilotRequestType.Direct;
		case PilotRequestType.AbsoluteHeading:
			return PilotRequestType.AbsoluteHeading;
		case PilotRequestType.RelativeHeading:
			return PilotRequestType.RelativeHeading;
		default:
			// biome-ignore lint/suspicious/noConsole: warn about unexpected request types from the brain
			console.warn(
				`Unknown request_type: ${requestType}, defaulting to FlightLevel`,
			);
			return PilotRequestType.FlightLevel;
	}
}

export type GoalResults = z.infer<typeof GoalResultsSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type LevelChangeGoal = z.infer<typeof LevelChangeGoalSchema>;
export type HeadingGoal = z.infer<typeof HeadingGoalSchema>;
export type HeadingConflict = z.infer<typeof HeadingConflictSchema>;
export type RequestContext = z.infer<typeof RequestContextSchema>;
export type ConflictCoordination = z.infer<typeof ConflictCoordinationSchema>;

/**
 * Normalized goal — a common shape used by UI components regardless of request type.
 * Fields that don't apply to a given request type are undefined.
 */
export interface NormalizedGoal {
	/** The requested value (RFL for level change/direct, heading degrees for heading) */
	requestedValue: number;
	/** Detailed analysis results — only present for level-change goals */
	results?: GoalResults;
	/** Next sector — available for both level-change and heading goals */
	nextSector?: string;
	/** Whether a valid heading was found — only for heading goals */
	isHeadingFound?: boolean;
	/** Conflicts within the sector — only for heading goals */
	inSectorConflicts?: (string | HeadingConflict)[];
}

/** Converts a raw Goal into a NormalizedGoal based on the request type. */
export function normalizeGoal(
	goal: Goal,
	requestType: PilotRequestType,
): NormalizedGoal {
	switch (requestType) {
		case PilotRequestType.FlightLevel:
		case PilotRequestType.Direct: {
			const g = goal as LevelChangeGoal;
			return {
				requestedValue: g.RFL,
				results: g.results,
				nextSector: g.results?.next_sector,
			};
		}
		case PilotRequestType.AbsoluteHeading:
		case PilotRequestType.RelativeHeading: {
			const g = goal as HeadingGoal;
			return {
				requestedValue: g.Req_hdg_value,
				nextSector: g.next_sector,
				isHeadingFound: g.Is_heading_found,
				inSectorConflicts: g.In_sector_conflicts,
			};
		}
		default: {
			// Fallback for unknown request types — treat as level change
			const g = goal as LevelChangeGoal;
			return {
				requestedValue: g.RFL,
				results: g.results,
				nextSector: g.results?.next_sector,
			};
		}
	}
}
