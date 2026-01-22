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
 * Schema for a goal entry.
 */
const GoalSchema = z.object({
	RFL: z.number(),
	results: GoalResultsSchema.optional(),
});

/**
 * Schema for the request context.
 */
const RequestContextSchema = z.object({
	request_id: z.string(),
	flight_id: z.string(),
	request_type: z.number(),
	request_parameter: z.number(),
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
export type GoalResults = z.infer<typeof GoalResultsSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type RequestContext = z.infer<typeof RequestContextSchema>;
export type ConflictCoordination = z.infer<typeof ConflictCoordinationSchema>;
