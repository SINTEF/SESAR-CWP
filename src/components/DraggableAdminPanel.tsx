import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

import { useDragging } from "../contexts/DraggingContext";
import { redirectToNonAdmin } from "../mqtt-client/auth";
import { adminStore } from "../state";
import AdminControlButtons from "./admin-panel/AdminControlButtons";
import AdminLogs from "./admin-panel/AdminLogs";
import ScenarioConfigurationPanel from "./admin-panel/ScenarioConfigurationPanel";
import BrainPanel from "./brain/BrainPanel";

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
