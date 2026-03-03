import { z } from "zod";

export const AdminLogJsonSchema = z
	.object({
		message: z.string().optional(),
		msg: z.string().optional(),
		level: z.string().optional(),
		severity: z.string().optional(),
		timestamp: z.union([z.string(), z.number()]).optional(),
		time: z.union([z.string(), z.number()]).optional(),
		ts: z.union([z.string(), z.number()]).optional(),
		date: z.union([z.string(), z.number()]).optional(),
	})
	.passthrough();

const SpeedChangeDisplayUnitSchema = z.enum(["MTN", "KT/M"]);
const AgendaScaleMinutesSchema = z.union([
	z.literal(5),
	z.literal(10),
	z.literal(15),
	z.literal(30),
	z.literal(60),
	z.literal(120),
	z.literal(240),
]);

export const PersistedCwpDisplaySettingsSchema = z
	.object({
		showFixes: z.boolean().optional(),
		showAirways: z.boolean().optional(),
		showSectorLabels: z.boolean().optional(),
		showVerticalWindow: z.boolean().optional(),
		showSpeedVectors: z.boolean().optional(),
		speedVectorMinutes: z.number().optional(),
		speedChangeDisplayUnit: SpeedChangeDisplayUnitSchema.optional(),
		agendaScaleMinutes: AgendaScaleMinutesSchema.optional(),
	})
	.passthrough();

export type PersistedCwpDisplaySettings = z.infer<
	typeof PersistedCwpDisplaySettingsSchema
>;
