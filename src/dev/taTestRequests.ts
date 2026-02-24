import type { PilotRequestJson } from "../schemas/pilotRequestSchema";

/**
 * Pre-crafted TA request testRequests for visual testing.
 * flight_id and request_id are placeholders — overridden at publish time.
 * Inject all at once via the "Send All TestRequests" button in AddRequestDialog
 * to see every label variant side by side on one aircraft.
 */
export const TA_TEST_REQUESTS: PilotRequestJson[] = [
	// 1. Flight level request — single goal, all green
	{
		timestamp: "2026-02-23T09:00:00.000Z",
		iteration_count: 0,
		context: {
			request_id: "testRequest-placeholder",
			flight_id: "testRequest-placeholder",
			request_type: 0,
			request_parameter: 350,
		},
		goals: [
			{
				RFL: 350,
				results: {
					exit_level: 350,
					initial_climb: 310,
					exit_problems_are_manageable: true,
					traffic_complexity_manageable: true,
					required_coordinations: [],
					higher_level_available: true,
					is_conform_to_flight_plan: true,
					next_sector: "E3",
					next_sector_capacity_ok: true,
					altitude_restriction: false,
				},
			},
		],
	},

	// 2. Flight level request — RFL and initial are different
	{
		timestamp: "2026-01-16T14:39:21.070850Z",
		iteration_count: 0,
		context: {
			request_id: "a23c4b7b-4881-4c14-beb2-b6e05b01a117",
			flight_id: "FPO215H",
			request_type: 0,
			request_parameter: 390,
		},
		goals: [
			{
				RFL: 390,
				results: {
					exit_level: 390,
					initial_climb: 350,
					exit_problems_are_manageable: true,
					traffic_complexity_manageable: true,
					required_coordinations: [
						"Flight plan non-conformity",
						{
							conflict_id: "CRL910",
							mach_number: 0.72,
							min_separation: 7,
							first_call_sign_at_the_exit: "FPO215H",
							compatible: true,
						},
					],
					higher_level_available: true,
					is_conform_to_flight_plan: false,
					next_sector: "E3",
					next_sector_capacity_ok: true,
					altitude_restriction: false,
				},
			},
		],
	},

	// 3. Flight level request — multiple goals rejection and then suggestion
	{
		timestamp: "2026-01-20T16:30:01.080650Z",
		iteration_count: 4,
		context: {
			request_id: "7e8442d8-0161-4752-b0af-e940d568793f",
			flight_id: "TYW451",
			request_type: 0,
			request_parameter: 370,
		},
		goals: [
			{
				RFL: 370,
				results: {
					exit_level: 370,
					initial_climb: 370,
					exit_problems_are_manageable: true,
					traffic_complexity_manageable: true,
					required_coordinations: ["Flight plan non-conformity"],
					higher_level_available: false,
					is_conform_to_flight_plan: false,
					next_sector: "M3",
					next_sector_capacity_ok: false,
					altitude_restriction: false,
				},
			},
			{
				RFL: 350,
				results: {
					exit_level: 350,
					initial_climb: 350,
					exit_problems_are_manageable: true,
					traffic_complexity_manageable: true,
					required_coordinations: ["Flight plan non-conformity"],
					higher_level_available: true,
					is_conform_to_flight_plan: false,
					next_sector: "M2",
					next_sector_capacity_ok: true,
					altitude_restriction: false,
				},
			},
		],
	},

	// 4. Heading request — no conflicts
	{
		timestamp: "2026-02-23T09:00:22.855639Z",
		iteration_count: 0,
		context: {
			request_id: "testRequest-placeholder",
			flight_id: "testRequest-placeholder",
			request_type: 2,
			request_parameter: 90,
		},
		goals: [
			{
				Req_hdg_value: 90,
				next_sector: "MIN34536",
				In_sector_conflicts: [],
				Is_heading_found: true,
			},
		],
	},

	// 5. Heading request with next_sector needing to be coordinated
	{
		timestamp: "2026-02-23T09:00:22.855639Z",
		iteration_count: 0,
		context: {
			request_id: "d0135e4d-8740-48c4-9df4-d64dee9a24af",
			flight_id: "TAR788",
			request_type: 2,
			request_parameter: 90,
		},
		goals: [
			{
				Req_hdg_value: 90,
				next_sector: "MIN34536",
				In_sector_conflicts: [],
				Is_heading_found: true,
			},
		],
	},

	// 6. Heading request with solution in the end
	{
		timestamp: "2026-02-23T09:00:10.203261Z",
		iteration_count: 30,
		context: {
			request_id: "95a4dec6-88f8-49a0-81e2-eb4645d5b442",
			flight_id: "HBJEC",
			request_type: 3,
			request_parameter: 45,
		},
		goals: [
			{
				Req_hdg_value: 20,
				next_sector: "5L",
				In_sector_conflicts: [
					{
						conflict_id: "TAR788",
						mach_number: 0.7869811468738934,
						min_separation: 3.6860852241516113,
						distance_from_intersection_to_exit: 7.901293754577637,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 25,
				next_sector: "5L",
				In_sector_conflicts: [
					{
						conflict_id: "TAR788",
						mach_number: 0.7891748264788969,
						min_separation: 3.6379172801971436,
						distance_from_intersection_to_exit: 7.808016300201416,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 30,
				next_sector: "5L",
				In_sector_conflicts: [
					{
						conflict_id: "TAR788",
						mach_number: 0.7899437294926327,
						min_separation: 4.011358737945557,
						distance_from_intersection_to_exit: 9.2081880569458,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 35,
				next_sector: "5L",
				In_sector_conflicts: [
					{
						conflict_id: "TAR788",
						mach_number: 0.7908653410943259,
						min_separation: 4.374152660369873,
						distance_from_intersection_to_exit: 10.404284477233887,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 40,
				next_sector: "5L",
				In_sector_conflicts: [
					{
						conflict_id: "TAR788",
						mach_number: 0.7914333552229827,
						min_separation: 4.731703758239746,
						distance_from_intersection_to_exit: 11.448385238647461,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 45,
				next_sector: "5L",
				In_sector_conflicts: [],
				Is_heading_found: true,
			},
		],
	},

	// 7. Heading request no solution
	{
		timestamp: "2026-02-23T08:59:02.419519Z",
		iteration_count: 0,
		context: {
			request_id: "e760a0d8-1258-47ff-93ee-f8318738b1ad",
			flight_id: "TAR788",
			request_type: 2,
			request_parameter: 340,
		},
		goals: [
			{
				Req_hdg_value: 340,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.792708416367185,
						min_separation: 0.23397105932235718,
						distance_from_intersection_to_exit: 7.95065450668335,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 335,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.792708416367185,
						min_separation: 0.23397105932235718,
						distance_from_intersection_to_exit: 7.95065450668335,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 330,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.7919748501871946,
						min_separation: 0.3875943124294281,
						distance_from_intersection_to_exit: 10.117430686950684,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 325,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.7911190313786332,
						min_separation: 1.0004152059555054,
						distance_from_intersection_to_exit: 11.113811492919922,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 320,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.7900927744965952,
						min_separation: 1.6003438234329224,
						distance_from_intersection_to_exit: 10.857489585876465,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 315,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.7890641573075438,
						min_separation: 2.1961100101470947,
						distance_from_intersection_to_exit: 10.761154174804688,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 310,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.787956329746578,
						min_separation: 2.783630609512329,
						distance_from_intersection_to_exit: 10.799017906188965,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 305,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.7876054852515811,
						min_separation: 3.363504648208618,
						distance_from_intersection_to_exit: 10.955824851989746,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
			{
				Req_hdg_value: 300,
				next_sector: "Y3",
				In_sector_conflicts: [
					{
						conflict_id: "HBJEC",
						mach_number: 0.7871674489040441,
						min_separation: 3.934103488922119,
						distance_from_intersection_to_exit: 11.223912239074707,
						first_call_sign_at_the_exit: null,
						conflict_FL: 360,
					},
				],
				Is_heading_found: false,
			},
		],
	},

	// 8. Direct-to request (NOT CONFIRMED WITH IIS)
	// {
	// 	timestamp: "2026-01-16T14:39:21.070850Z",
	// 	iteration_count: 0,
	// 	context: {
	// 		request_id: "a23c4b7b-4881-4c14-beb2-b6e05b01a117",
	// 		flight_id: "FPO215H",
	// 		request_type: 1,
	// 		request_parameter: "LUSOL",
	// 	},
	// 	goals: [
	// 		{
	// 			Req_dir_value: "LUSOL",
	// 			direct_value_available: true,
	// 			next_sector: "E3",

	// 			in_sector_conflicts: [],
	// 			exit_conflicts: [],
	// 		},
	// 	],
	// },
];
