import { observer } from "mobx-react-lite";

import {
	clearStartupConfiguration,
	handlePublishPromise,
	setStartupConfiguration,
} from "../../mqtt-client/publishers";
import { adminStore } from "../../state";
import { formatLocalDateTime } from "./adminPanelUtils";

const SCENARIO_OPTIONS = [
	{ value: "training", label: "training / 1" },
	{ value: "collect1", label: "collect1 / 2" },
	{ value: "collect2", label: "collect2 / 3" },
	{ value: "dialog_beta", label: "dialog_beta / 4" },
] as const;

const ScenarioConfigurationPanel = observer(
	function ScenarioConfigurationPanel() {
		const selectedScenario = adminStore.selectedStartupScenario;
		const simulatorScenario = adminStore.simulatorStartupScenario;
		const lastInitialisationCompletedAt =
			adminStore.lastInitialisationCompletedAt;

		const handleApply = () => {
			if (!selectedScenario) {
				return;
			}

			handlePublishPromise(setStartupConfiguration(selectedScenario));
		};

		const handleClear = () => {
			adminStore.setSelectedStartupScenario(null);
			handlePublishPromise(clearStartupConfiguration());
		};

		return (
			<div className="h-68 overflow-y-auto bg-neutral-900 p-3 text-sm space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="startup-scenario-select"
						className="block text-gray-300"
					>
						Scenario
					</label>
					<select
						id="startup-scenario-select"
						className="select select-sm select-bordered w-full"
						value={selectedScenario ?? ""}
						onChange={(event) => {
							const value = event.target.value;
							adminStore.setSelectedStartupScenario(value || null);
						}}
					>
						<option value="">Unset</option>
						{SCENARIO_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="flex gap-2">
						<button
							type="button"
							className="btn btn-sm btn-primary"
							onClick={handleApply}
							disabled={!selectedScenario}
						>
							Apply
						</button>
						<button
							type="button"
							className="btn btn-sm btn-outline"
							onClick={handleClear}
						>
							Clear (unset)
						</button>
					</div>
				</div>

				<div className="divider my-1" />

				<div className="space-y-2 text-gray-300">
					<div>
						<span className="text-gray-400">Selected scenario: </span>
						<span className="font-semibold">{selectedScenario ?? "unset"}</span>
					</div>
					<div>
						<span className="text-gray-400">Simulator scenario: </span>
						<span className="font-semibold">
							{simulatorScenario ?? "unknown"}
						</span>
						{selectedScenario &&
							simulatorScenario &&
							selectedScenario !== simulatorScenario && (
								<div className="mt-1 text-warning text-xs">
									Differs from selected scenario. Please restart the simulator.
									The simulator operator may also ignore your selected scenario
									choice.
								</div>
							)}
					</div>
					<div>
						<span className="text-gray-400">Initialisation: </span>
						<span className="font-semibold">
							{lastInitialisationCompletedAt
								? formatLocalDateTime(lastInitialisationCompletedAt)
								: "None or pending"}
						</span>
					</div>
				</div>
			</div>
		);
	},
);

export default ScenarioConfigurationPanel;
