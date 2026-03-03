import { z } from "zod";

const WorkloadUpdateParamsSchema = z.object({
	workload: z.number(),
	accuracy: z.number(),
	timestamp: z.union([z.string(), z.number()]),
});

export const WorkloadUpdateMessageSchema = z.object({
	jsonrpc: z.string(),
	method: z.literal("workloadUpdate"),
	params: WorkloadUpdateParamsSchema,
	id: z.number(),
});

const ISAUpdateParamsSchema = z.object({
	ISA: z.number(),
	timestamp: z.union([z.string(), z.number()]),
});

export const ISAUpdateMessageSchema = z.object({
	jsonrpc: z.string(),
	method: z.literal("ISAUpdate"),
	params: ISAUpdateParamsSchema,
	id: z.number(),
});

export const FrontendManualAPMessageSchema = z.union([z.number(), z.null()]);

export const FrontendPredictiveTrajectoryStateMessageSchema =
	z.discriminatedUnion("mode", [
		z.object({
			mode: z.literal("unset"),
		}),
		z.object({
			mode: z.literal("rerouted"),
		}),
		z.object({
			mode: z.literal("rerouted-via-waypoint"),
			waypointId: z.string().min(1),
			latitude: z.number(),
			longitude: z.number(),
		}),
	]);

export const PilotRequestFinishedMessageSchema = z.object({
	finished: z.literal(true),
});

export const PilotRequestReplyMessageSchema = z.object({
	reply: z.string(),
});

export type WorkloadUpdateMessage = z.infer<typeof WorkloadUpdateMessageSchema>;
export type ISAUpdateMessage = z.infer<typeof ISAUpdateMessageSchema>;
export type FrontendManualAPMessage = z.infer<
	typeof FrontendManualAPMessageSchema
>;
export type FrontendPredictiveTrajectoryStateMessage = z.infer<
	typeof FrontendPredictiveTrajectoryStateMessageSchema
>;
