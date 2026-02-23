import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import { useDragging } from "../contexts/DraggingContext";
import { redirectToNonAdmin } from "../mqtt-client/auth";
import {
	clearStartupConfiguration,
	fastForwardSimulator,
	handlePublishPromise,
	pauseSimulator,
	restartSimulator,
	setStartupConfiguration,
	startSimulator,
} from "../mqtt-client/publishers";
import { adminStore } from "../state";
import BrainPanel from "./brain/BrainPanel";

const SCENARIO_OPTIONS = [
	{ value: "training", label: "training / 1" },
	{ value: "collect1", label: "collect1 / 2" },
	{ value: "collect2", label: "collect2 / 3" },
	{ value: "dialog_beta", label: "dialog_beta / 4" },
] as const;

function formatTimestamp(timestamp: number): string {
	const date = new Date(timestamp);
	return date.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

function formatLocalDateTime(date: Date): string {
	return date.toLocaleString("en-GB", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

function getLevelColor(level?: string): string {
	if (!level) {
		return "text-gray-300";
	}
	const lowerLevel = level.toLowerCase();
	if (lowerLevel.includes("error") || lowerLevel.includes("fatal")) {
		return "text-error";
	}
	if (lowerLevel.includes("warn")) {
		return "text-warning";
	}
	if (lowerLevel.includes("info")) {
		return "text-info";
	}
	if (lowerLevel.includes("debug") || lowerLevel.includes("trace")) {
		return "text-gray-500";
	}
	return "text-gray-300";
}

/** Control buttons for simulator - observer to react to restart state */
const AdminControlButtons = observer(function AdminControlButtons() {
	const [ffwMinutes, setFfwMinutes] = useState(5);

	const handleStart = () => {
		handlePublishPromise(startSimulator());
	};

	const handlePause = () => {
		handlePublishPromise(pauseSimulator());
	};

	const handleFastForward = () => {
		handlePublishPromise(fastForwardSimulator(ffwMinutes));
	};

	// Watch for simulator restart confirmation
	useEffect(() => {
		if (adminStore.simulationRestarted) {
			window.location.reload();
		}
	}, [adminStore.simulationRestarted]);

	const handleRestart = () => {
		adminStore.expectRestart();
		handlePublishPromise(restartSimulator());
	};

	return (
		<div className="flex flex-wrap gap-2 p-3 border-y border-t-neutral-700 border-b-0 bg-neutral-800">
			<button
				type="button"
				className="btn btn-sm btn-success"
				onClick={handleStart}
			>
				▶ Start
			</button>
			<button
				type="button"
				className="btn btn-sm btn-warning"
				onClick={handlePause}
			>
				⏸ Pause
			</button>
			<div className="flex items-center gap-1">
				<input
					type="number"
					className="input input-sm input-bordered w-16"
					min={1}
					max={60}
					value={ffwMinutes}
					onChange={(e) =>
						setFfwMinutes(Math.max(1, Number.parseInt(e.target.value, 10) || 1))
					}
				/>
				<button
					type="button"
					className="btn btn-sm btn-info"
					onClick={handleFastForward}
				>
					⏩ FFW
				</button>
			</div>
			<button
				type="button"
				className="btn btn-sm btn-error"
				onClick={handleRestart}
			>
				🔄 Restart
			</button>
		</div>
	);
});

/** Logs container - observer to re-render only when logs change */
const AdminLogs = observer(function AdminLogs() {
	// CSS-only auto-scroll: outer wrapper with flex-direction: column-reverse
	// keeps scroll pinned to bottom without any JavaScript
	return (
		<div className="logs-container h-68 overflow-y-auto flex flex-col-reverse bg-black !select-text [&_*]:!select-text">
			<div className="p-3 font-mono text-xs">
				{adminStore.logs.length === 0 ? (
					<div className="text-gray-500 italic">No logs yet...</div>
				) : (
					adminStore.logs.map((log, index) => (
						<div
							key={`${log.timestamp}-${index}`}
							className="whitespace-pre-wrap wrap-break-word mb-1"
						>
							<span className="text-gray-500">
								[{formatTimestamp(log.timestamp)}]
							</span>{" "}
							{log.level && (
								<span className={`${getLevelColor(log.level)} font-bold`}>
									[{log.level.toUpperCase()}]
								</span>
							)}{" "}
							<span className={getLevelColor(log.level)}>{log.message}</span>
						</div>
					))
				)}
			</div>
		</div>
	);
});

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
						Startup Scenario
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

export default observer(function DraggableAdminPanel() {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { startDragging, stopDragging } = useDragging();
	const [activeTab, setActiveTab] = useState<"logs" | "brains" | "scenario">(
		"logs",
	);

	if (!adminStore.adminModeEnabled || !adminStore.showAdminPanel) {
		return null;
	}

	return (
		<Draggable
			nodeRef={nodeRef}
			bounds="parent"
			cancel="input, button, select, .logs-container"
			onStart={startDragging}
			onStop={stopDragging}
			handle=".drag-handle"
		>
			<div
				ref={nodeRef}
				className="absolute top-2 right-46 z-501 w-125 shadow-xl rounded-lg overflow-hidden cursor-default!"
			>
				{/* Header / Drag Handle */}
				<div className="drag-handle flex items-center justify-between px-4 py-2 bg-black/50 cursor-grab active:cursor-grabbing backdrop-blur-md">
					<h2 className="text-lg font-semibold text-white">Admin</h2>
					<div className="flex items-center gap-1">
						<button
							type="button"
							className="btn btn-xs btn-ghost text-error"
							onClick={() => redirectToNonAdmin()}
							title="Exit Admin Mode"
						>
							Exit
						</button>
						<button
							type="button"
							className="btn btn-sm btn-ghost btn-circle"
							onClick={() => adminStore.toggleMinimized()}
						>
							{adminStore.isMinimized ? "▼" : "▲"}
						</button>
					</div>
				</div>

				{!adminStore.isMinimized && (
					<>
						<AdminControlButtons />
						<div
							role="tablist"
							className="tabs tabs-lift tabs-sm bg-neutral-800 "
						>
							<button
								type="button"
								role="tab"
								className={`ml-1 tab ${activeTab === "logs" ? "tab-active" : ""}`}
								onClick={() => setActiveTab("logs")}
							>
								Logs
							</button>
							<button
								type="button"
								role="tab"
								className={`tab ${activeTab === "brains" ? "tab-active" : ""}`}
								onClick={() => setActiveTab("brains")}
							>
								{/* Note that Brian is a voluntary spell as the "brain" tool is named "Brian" */}
								Brian
							</button>
							<button
								type="button"
								role="tab"
								className={`tab ${activeTab === "scenario" ? "tab-active" : ""}`}
								onClick={() => setActiveTab("scenario")}
							>
								Scenario Configuration
							</button>
						</div>

						{activeTab === "logs" && <AdminLogs />}
						{activeTab === "brains" && <BrainPanel />}
						{activeTab === "scenario" && <ScenarioConfigurationPanel />}
					</>
				)}
			</div>
		</Draggable>
	);
});
