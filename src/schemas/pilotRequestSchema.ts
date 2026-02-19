import { z } from "zod";

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
 * Schema for a level-change goal entry (request_type !== 2).
 */
const LevelChangeGoalSchema = z.object({
	RFL: z.number(),
	results: GoalResultsSchema.optional(),
});

/**
 * Schema for a heading goal entry (request_type === 2).
 */
const HeadingGoalSchema = z.object({
	Req_hdg_value: z.number(),
	next_sector: z.string(),
	In_sector_conflicts: z.array(z.string()),
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

export enum RequestType {
	LevelChange = 0,
	Heading = 2,
}

/** Maps a request_type number to a RequestType enum. */
export function getRequestType(requestType: number): RequestType {
	switch (requestType) {
		case RequestType.LevelChange:
			return RequestType.LevelChange;
		case RequestType.Heading:
			return RequestType.Heading;
		default:
			// biome-ignore lint/suspicious/noConsole: warn about unexpected request types from the simulator
			console.warn(
				`Unknown request_type: ${requestType}, defaulting to LevelChange`,
			);
			return RequestType.LevelChange;
	}
}
export type GoalResults = z.infer<typeof GoalResultsSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type LevelChangeGoal = z.infer<typeof LevelChangeGoalSchema>;
export type HeadingGoal = z.infer<typeof HeadingGoalSchema>;
export type RequestContext = z.infer<typeof RequestContextSchema>;
export type ConflictCoordination = z.infer<typeof ConflictCoordinationSchema>;

/**
 * Normalized goal — a common shape used by UI components regardless of request type.
 * Fields that don't apply to a given request type are undefined.
 */
export interface NormalizedGoal {
	/** The requested value (RFL for level change, heading degrees for heading) */
	requestedValue: number;
	/** Detailed analysis results — only present for level-change goals */
	results?: GoalResults;
	/** Next sector — available for both level-change and heading goals */
	nextSector?: string;
	/** Whether a valid heading was found — only for heading goals */
	isHeadingFound?: boolean;
	/** Conflicts within the sector — only for heading goals */
	inSectorConflicts?: string[];
}

/** Converts a raw Goal into a NormalizedGoal based on the request type. */
export function normalizeGoal(
	goal: Goal,
	requestType: RequestType,
): NormalizedGoal {
	switch (requestType) {
		case RequestType.LevelChange: {
			const g = goal as LevelChangeGoal;
			return {
				requestedValue: g.RFL,
				results: g.results,
				nextSector: g.results?.next_sector,
			};
		}
		case RequestType.Heading: {
			const g = goal as HeadingGoal;
			return {
				requestedValue: g.Req_hdg_value,
				nextSector: g.next_sector,
				isHeadingFound: g.Is_heading_found,
				inSectorConflicts: g.In_sector_conflicts,
			};
		}
		default: {
			// Fallback: treat unknown request types as level-change
			const g = goal as LevelChangeGoal;
			return {
				requestedValue: g.RFL,
				results: g.results,
				nextSector: g.results?.next_sector,
			};
		}
	}
}
