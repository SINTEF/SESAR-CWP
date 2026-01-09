import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { point as turfPoint, polygon as turfPolygon } from "@turf/helpers";
import type { Feature, Polygon, Position } from "geojson";
import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable } from "mobx";
import type {
	AirTrafficControllerAssignmentMessage,
	RoleConfigurationMessage,
} from "../proto/ProtobufAirTrafficSimulator";
import type AircraftModel from "./AircraftModel";
import type AircraftStore from "./AircraftStore";
import type ConfigurationStore from "./ConfigurationStore";
import type CoordinatePair from "./CoordinatePair";
import type CWPStore from "./CwpStore";
import { FLIGHT_LABEL_COLORS, type FlightLabelColorCategory } from "./CwpStore";
import convertTimestamp from "./convertTimestamp";
import type FixStore from "./FixStore";
import type { ISectorModel } from "./ISectorModel";
import RoleConfigurationModel from "./RoleConfigurationModel";

export default class RoleConfigurationStore {
	roleConfigurations: ObservableMap<string, RoleConfigurationModel> =
		observable.map(undefined, { deep: false });

	configurationStore: ConfigurationStore;

	aircraftStore: AircraftStore;

	cwpStore: CWPStore;

	fixStore: FixStore;

	constructor({
		configurationStore,
		aircraftStore,
		cwpStore,
		fixStore,
	}: {
		configurationStore: ConfigurationStore;
		aircraftStore: AircraftStore;
		cwpStore: CWPStore;
		fixStore: FixStore;
	}) {
		makeAutoObservable(
			this,
			{
				configurationStore: false,
				getControlledSector: false,
				aircraftStore: false,
				cwpStore: false,
				fixStore: false,
				pointInCurrentControlledSector: false,
			},
			{ autoBind: true },
		);
		this.configurationStore = configurationStore;
		this.aircraftStore = aircraftStore;
		this.cwpStore = cwpStore;
		this.fixStore = fixStore;
		this.getControlledSector = this.getControlledSector.bind(this);
		this.pointInCurrentControlledSector =
			this.pointInCurrentControlledSector.bind(this);
	}

	get currentControlledSector(): string | undefined {
		const { currentCWP, currentConfigurationId } = this.configurationStore;
		return this.findCurrentSectorByCWP(currentCWP, currentConfigurationId);
	}

	get nextControlledSector(): string | undefined {
		const { currentCWP, nextConfigurationId } = this.configurationStore;
		if (!nextConfigurationId) {
			return undefined;
		}
		return this.findCurrentSectorByCWP(currentCWP, nextConfigurationId);
	}

	currentControlledSectorByCWP(cwp: string): string | undefined {
		const { currentConfigurationId } = this.configurationStore;
		return this.findCurrentSectorByCWP(cwp, currentConfigurationId);
	}

	nextControlledSectorByCWP(cwp: string): string | undefined {
		const { nextConfigurationId } = this.configurationStore;
		if (!nextConfigurationId) {
			return undefined;
		}
		return this.findCurrentSectorByCWP(cwp, nextConfigurationId);
	}

	getControlledSector(cwpRoleName: string, config: string): string {
		const configuration = this.roleConfigurations.get(cwpRoleName);
		if (!configuration) {
			return "";
		}

		const { sectorToConfiguration } = configuration;
		const sectorAndConfig = [...sectorToConfiguration.values()].find(
			(sectorToconfig) => sectorToconfig.configurationId === config,
		);
		return sectorAndConfig?.controlledSector ?? "";
	}

	setControlledSector(
		cwpRoleName: string,
		config: string,
		sector: string,
	): void {
		let configuration = this.roleConfigurations.get(cwpRoleName);
		if (!configuration) {
			configuration = new RoleConfigurationModel({
				cwpRoleName,
			});
			this.roleConfigurations.set(cwpRoleName, configuration);
		}
		configuration.setControlledSector(config, sector);
	}

	handleNewRoleConfigutationMessage(newConfig: RoleConfigurationMessage): void {
		const { roleName, sectorToControl } = newConfig;
		const cwpRole = this.roleConfigurations.get(roleName);
		if (!cwpRole) {
			this.roleConfigurations.set(
				roleName,
				new RoleConfigurationModel({
					cwpRoleName: roleName,
				}),
			);
			this.roleConfigurations
				.get(roleName)
				?.replaceSectorsToControl([sectorToControl]);
		}
		// setControlledSector(roleName, newConfig., [
		// 	newConfig.sectorToControl,
		// ]);
		// cwpRole.addSectorsToControl(newConfig.sectorToControl);
		const { tentativeFlights } = newConfig;
		cwpRole?.addTentativeAircraft(tentativeFlights);
	}

	findCurrentSectorByCWP(cwp: string, config: string): string | undefined {
		const listOfSectorIds = this.roleConfigurations.get(cwp)?.sectorToControl;
		return listOfSectorIds && listOfSectorIds[0]; // This is changed and might need to be rearranged
	}
	// console.log(this.roleConfigurations.get(cwp)?.sectorToControl, cwp);
	// 	const includedAirspaces =
	// 		this.configurationStore.getAreaOfIncludedAirpaces(config); // These are the sectors
	// 	if (listOfSectorIds) {
	// 		for (const sector of listOfSectorIds) {
	// 			const area = RoleConfigurationStore.getAreaForSector(
	// 				includedAirspaces,
	// 				sector,
	// 			);
	// 			if (area) {
	// 				return sector;
	// 			}
	// 		}
	// 	}
	// 	return undefined;
	// }

	private static getAreaForSector(
		areas: ISectorModel[],
		sector: string,
	): CoordinatePair[] | undefined {
		const area = areas.find(({ sectorId }) => sectorId === sector);
		if (!area) {
			return undefined;
		}
		const { sectorArea } = area;
		if (sectorArea.length === 0) {
			return undefined;
		}
		return [...sectorArea, sectorArea[0]];
	}

	get areaOfCurrentControlledSector(): CoordinatePair[] | undefined {
		const listOfSectorIds = this.roleConfigurations.get(
			this.configurationStore.currentCWP,
		)?.sectorToControl;
		if (listOfSectorIds) {
			for (const sector of listOfSectorIds) {
				const area = RoleConfigurationStore.getAreaForSector(
					this.configurationStore.areaOfIncludedAirspaces,
					sector,
				);
				if (area) {
					return area;
				}
			}
		}
		return undefined;
	}

	get areaOfCurrentControllerSectorAsTurfFeature():
		| Feature<Polygon>
		| undefined {
		const area = this.areaOfCurrentControlledSector;
		if (area && area?.length > 0) {
			const edges = area.map((edge) => [edge.longitude, edge.latitude]);
			return turfPolygon([[...edges, edges[0]]]);
		} else {
			return undefined;
		}
	}

	pointInCurrentControlledSector(lat: number, lng: number): boolean {
		const feature = this.areaOfCurrentControllerSectorAsTurfFeature;
		if (!feature) {
			return false;
		}
		return booleanPointInPolygon(turfPoint([lng, lat]), feature);
	}

	getcolorBySectorId(sectorId: string): string {
		const color = [...this.roleConfigurations]
			.map(([index, array]) =>
				array.inSectorToControl(sectorId)
					? this.roleConfigurations.get(index)?.assignedColorById
					: undefined,
			)
			.find((element) => element !== undefined);
		return color ?? "#555";
	}

	getCWPBySectorId(sectorId: string): string {
		const cwpName = [...this.roleConfigurations]
			.map(([index, array]) =>
				array.inSectorToControl(sectorId)
					? this.roleConfigurations.get(index)?.cwpRoleName
					: undefined,
			)
			.find((element) => element !== undefined);
		return cwpName ?? "";
	}

	handleNewAirTrafficControllerMessage(
		newAirTrafficControllerMessage: AirTrafficControllerAssignmentMessage,
	): void {
		const roleName = `CWP${newAirTrafficControllerMessage.airTrafficControllerId}`;
		const controllingSectors = newAirTrafficControllerMessage.sectorIds;
		this.roleConfigurations.set(
			roleName,
			new RoleConfigurationModel({
				cwpRoleName: roleName,
			}),
		);
		this.roleConfigurations
			.get(roleName)
			?.replaceSectorsToControl(controllingSectors);
		this.roleConfigurations.get(roleName)?.setAssignedColor();
	}

	get areaOfNextControlledSector(): CoordinatePair[] | undefined {
		if (!this.nextControlledSector) {
			return undefined;
		}
		const listOfSectorIds = this.roleConfigurations.get(
			this.configurationStore.currentCWP,
		)?.sectorToControl;
		if (listOfSectorIds) {
			for (const sector of listOfSectorIds) {
				const area = RoleConfigurationStore.getAreaForSector(
					this.configurationStore.areaOfIncludedAirspacesForNextConfiguration,
					sector,
				);
				if (area) {
					return area;
				}
			}
		}
		return undefined;
	}

	get topFLcurrentSector(): number | undefined {
		if (!this.currentControlledSector) {
			return undefined;
		}
		const listOfSectorIds = this.roleConfigurations.get(
			this.configurationStore.currentCWP,
		)?.sectorToControl;
		if (listOfSectorIds) {
			for (const sector of listOfSectorIds) {
				const area = RoleConfigurationStore.getAreaForSector(
					this.configurationStore.areaOfIncludedAirspaces,
					sector,
				);
				if (area) {
					return this.configurationStore.airspaceStore.airspaces.get(sector)
						?.topFlightLevel;
				}
			}
		}
		return undefined;
	}

	get topFLNextSector(): number | undefined {
		if (!this.nextControlledSector) {
			return undefined;
		}
		const listOfSectorIds = this.roleConfigurations.get(
			this.configurationStore.currentCWP,
		)?.sectorToControl;
		if (listOfSectorIds) {
			for (const sector of listOfSectorIds) {
				const area = RoleConfigurationStore.getAreaForSector(
					this.configurationStore.areaOfIncludedAirspacesForNextConfiguration,
					sector,
				);
				if (area) {
					return this.configurationStore.airspaceStore.airspaces.get(sector)
						?.topFlightLevel;
				}
			}
		}
		return undefined;
	}

	get bottomFLcurrentSector(): number | undefined {
		if (!this.currentControlledSector) {
			return undefined;
		}
		const listOfSectorIds = this.roleConfigurations.get(
			this.configurationStore.currentCWP,
		)?.sectorToControl;
		if (listOfSectorIds) {
			for (const sector of listOfSectorIds) {
				const area = RoleConfigurationStore.getAreaForSector(
					this.configurationStore.areaOfIncludedAirspaces,
					sector,
				);
				if (area) {
					return this.configurationStore.airspaceStore.airspaces.get(sector)
						?.bottomFlightLevel;
				}
			}
		}
		return undefined;
	}

	get bottomFLNextSector(): number | undefined {
		if (!this.nextControlledSector) {
			return undefined;
		}
		const listOfSectorIds = this.roleConfigurations.get(
			this.configurationStore.currentCWP,
		)?.sectorToControl;
		if (listOfSectorIds) {
			for (const sector of listOfSectorIds) {
				const area = RoleConfigurationStore.getAreaForSector(
					this.configurationStore.areaOfIncludedAirspacesForNextConfiguration,
					sector,
				);
				if (area) {
					return this.configurationStore.airspaceStore.airspaces.get(sector)
						?.bottomFlightLevel;
				}
			}
		}
		return undefined;
	}

	/**
	 * Get the flight label color category for an aircraft.
	 * This determines the aircraft's color based on its control state and sector entry timing.
	 *
	 * Priority (highest to lowest):
	 * 1. WHITE: Currently controlled by the ATCO's sector (accepted)
	 * 2. LIGHT_GREEN: Within the sector (between entry and exit) but not assumed, OR about to enter within time window
	 * 3. GREEN: Has information about entering the sector (anticipated, not yet imminent)
	 * 4. GREY: Not of interest (no sector entry info or already exited)
	 */
	getFlightLabelColorCategory(aircraftId: string): FlightLabelColorCategory {
		const aircraft = this.aircraftStore.aircrafts.get(aircraftId);
		if (!aircraft) {
			return "grey";
		}

		const currentCWP = this.configurationStore.currentCWP;
		const currentSector = this.currentControlledSector;

		// Priority 1: WHITE - Currently controlled by the ATCO's sector
		if (aircraft.controlledBy === currentCWP) {
			return "white";
		}

		// Check if aircraft has sector entry information for the current sector
		if (currentSector) {
			const flightInSector = aircraft.flightInSectorTimes.get(currentSector);
			if (flightInSector?.entryPosition?.time) {
				const entryTimestamp = convertTimestamp(
					flightInSector.entryPosition.time,
				);
				const currentTimestamp = aircraft.simulatorStore.timestamp;
				const timeUntilEntry = entryTimestamp - currentTimestamp;

				// Check exit time if available
				const exitTimestamp = flightInSector.exitPosition?.time
					? convertTimestamp(flightInSector.exitPosition.time)
					: null;

				// Aircraft is currently within the sector (past entry, before exit) but not assumed
				// This is a critical situation - should be LIGHT_GREEN
				if (timeUntilEntry <= 0) {
					// Past entry time - check if still before exit
					if (exitTimestamp === null || currentTimestamp < exitTimestamp) {
						return "lightGreen";
					}
					// Past exit time - no longer of interest
					return "grey";
				}

				// Aircraft has not yet entered
				const lightGreenWindowSeconds =
					this.cwpStore.lightGreenTimeWindowMinutes * 60;

				// Priority 2: LIGHT_GREEN - About to enter within configured time window
				if (timeUntilEntry <= lightGreenWindowSeconds) {
					return "lightGreen";
				}

				// Priority 3: GREEN - Has sector entry info but not yet imminent
				return "green";
			}
		}

		// Check if aircraft is in the list of aircraft entering the current sector
		// This is a fallback for aircraft that have sector entry info via other means
		if (this.aircraftsEnteringCurrentSector.includes(aircraft)) {
			return "green";
		}

		// Priority 4: GREY - Not of interest
		return "grey";
	}

	/**
	 * Get the base color for an aircraft based on its role/state (without warning color).
	 * Use this for popup content where warning colors should not apply.
	 */
	getBaseColorOfAircraft(aircraftId: string): string {
		const category = this.getFlightLabelColorCategory(aircraftId);
		return FLIGHT_LABEL_COLORS[category];
	}

	/**
	 * Get the display color for an aircraft (includes warning color if set).
	 * Warning color has priority over all other colors.
	 * Use this for icons and speed vectors.
	 */
	getOriginalColorOfAircraft(aircraftId: string): string {
		// Warning color has priority over all other colors
		const warningColor = this.cwpStore.getWarningColor(aircraftId);
		if (warningColor) {
			return warningColor;
		}

		return this.getBaseColorOfAircraft(aircraftId);
	}

	get listOfFlightsInCurrentSector(): AircraftModel[] | [] {
		if (this.areaOfCurrentControlledSector !== undefined) {
			const coordinates = this.areaOfCurrentControlledSector?.map(
				(point): Position => [point.longitude, point.latitude],
			);
			const boundsGeometry = turfPolygon([coordinates]);
			const temporaryAircrafts: AircraftModel[] = [];
			const topFL = this.topFLcurrentSector;
			const bottomFL = this.bottomFLcurrentSector;
			for (const aircraft of this.aircraftStore.aircrafts) {
				const position: Position = [
					aircraft[1].lastKnownLongitude,
					aircraft[1].lastKnownLatitude,
				];
				const bool = booleanPointInPolygon(position, boundsGeometry);
				if (
					bool &&
					bottomFL &&
					topFL &&
					aircraft[1].lastKnownAltitude <= topFL &&
					aircraft[1].lastKnownAltitude >= bottomFL
				) {
					temporaryAircrafts.push(
						...this.aircraftStore.aircraftsWithPosition.filter(
							(flight) => flight.assignedFlightId === aircraft[0],
						),
					);
				}
			}
			return temporaryAircrafts;
		}
		return [];
	}

	get listOfAllControllers(): string[] {
		const controllers: string[] = [];
		for (const value of this.roleConfigurations) {
			controllers.push(value[0]);
		}
		return controllers;
	}

	get listOfAllPseudoControllers(): string[] {
		const pseudoControllers: string[] = [];
		for (const value of this.roleConfigurations) {
			pseudoControllers.push(`${value[0]} PseudoPilot`);
		}
		return pseudoControllers;
	}

	get aircraftsEnteringCurrentSector(): AircraftModel[] {
		const currentSector = this.currentControlledSector;
		const listOfAircraftsInSector = this.listOfFlightsInCurrentSector;
		const listOfAircraftsEnteringSector = currentSector
			? this.aircraftStore.aircraftsWithRecentTargetReport.map((aircraft) => {
					if (aircraft.flightInSectorTimes?.get(currentSector) !== undefined) {
						return aircraft;
					}
					return undefined;
				})
			: [];
		const filteredUndefined: AircraftModel[] = [];
		for (const aircraft of listOfAircraftsEnteringSector) {
			if (aircraft !== undefined) {
				filteredUndefined.push(aircraft);
			}
		}
		const allAircrafts = [
			...new Set([...listOfAircraftsInSector, ...filteredUndefined]),
		];
		return allAircrafts;
	}

	get listOfFixesInPolygon(): string[] {
		const { fixes } = this.fixStore;
		if (this.areaOfCurrentControlledSector !== undefined) {
			const coordinates = this.areaOfCurrentControlledSector.map(
				(point): Position => [point.longitude, point.latitude],
			);
			const boundsGeometry = turfPolygon([coordinates]);
			const temporaryFixes: string[] = [];
			for (const fix of fixes) {
				const position: Position = [fix[1].longitude, fix[1].latitude];
				const bool = booleanPointInPolygon(position, boundsGeometry);
				if (bool) {
					temporaryFixes.push(fix[0]);
				}
			}
			temporaryFixes.sort();
			return temporaryFixes;
		}
		return [];
	}

	get addedRemovedAircrafts(): [AircraftModel[], AircraftModel[]] | [] {
		const currentSectorBounds = this.areaOfCurrentControlledSector?.map(
			(point): Position => [point.longitude, point.latitude],
		);
		const nextSectorBounds = this.areaOfNextControlledSector?.map(
			(point): Position => [point.longitude, point.latitude],
		);
		const topFlCurrent = this.topFLcurrentSector;
		const bottomFLCurrent = this.bottomFLcurrentSector;
		const topFLNext = this.topFLNextSector;
		const bottomFLNext = this.bottomFLNextSector;
		if (currentSectorBounds && nextSectorBounds) {
			const currentPolygon = turfPolygon([currentSectorBounds]);
			const nextPolygon = turfPolygon([nextSectorBounds]);
			// const scaledNextSectorBounds = transformScale(nextPolygon, 1.25, { origin: 'centroid' });
			// const scaledCurrentSectorBounds =
			// transformScale(currentPolygon, 0.75, { origin: 'centroid' });
			const addedAircrafts: AircraftModel[] = [];
			const removedAircrafts: AircraftModel[] = [];
			for (const aircraft of this.aircraftStore.aircrafts) {
				const inCurrentFL =
					topFlCurrent &&
					bottomFLCurrent &&
					aircraft[1].lastKnownAltitude <= topFlCurrent &&
					aircraft[1].lastKnownAltitude >= bottomFLCurrent;
				const inNextFL =
					topFLNext &&
					bottomFLNext &&
					aircraft[1].lastKnownAltitude <= topFLNext &&
					aircraft[1].lastKnownAltitude >= bottomFLNext;
				const position: Position = [
					aircraft[1].lastKnownLongitude,
					aircraft[1].lastKnownLatitude,
				];
				const inCurrentSector = booleanPointInPolygon(position, currentPolygon);
				const inNextSector = booleanPointInPolygon(position, nextPolygon);
				if (!inCurrentSector && inNextSector && inNextFL) {
					addedAircrafts.push(aircraft[1]);
				}
				if (inCurrentSector && !inNextSector && inCurrentFL) {
					removedAircrafts.push(aircraft[1]);
				}
				if (inCurrentSector && inNextSector) {
					if (inCurrentFL && !inNextFL) {
						removedAircrafts.push(aircraft[1]);
					} else if (!inCurrentFL && inNextFL) {
						addedAircrafts.push(aircraft[1]);
					}
				}
			}
			return [addedAircrafts, removedAircrafts];
		}
		return [];
	}

	get areaOfAirspacesToDisplayIn3DView(): ISectorModel[] {
		const areas = this.configurationStore.areaOfAirspacesToDisplay;
		return areas.filter(({ sectorId }) => {
			const cwp = this.getCWPBySectorId(sectorId);
			return !this.cwpStore.isCWPDisabledIn3DView(cwp);
		});
	}
}
