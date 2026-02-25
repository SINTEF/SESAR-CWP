import { observer } from "mobx-react-lite";
import { useEffect, useId, useRef, useState } from "react";
import Draggable from "react-draggable";

import { useDragging } from "../contexts/DraggingContext";
import { redirectToNonAdmin } from "../mqtt-client/auth";
import { adminStore } from "../state";
import AdminControlButtons from "./admin-panel/AdminControlButtons";
import AdminLogs from "./admin-panel/AdminLogs";
import DebugPanel from "./admin-panel/DebugPanel";
import ScenarioConfigurationPanel from "./admin-panel/ScenarioConfigurationPanel";
import BrainPanel from "./brain/BrainPanel";

type AdminPanelTab = "logs" | "brains" | "scenario" | "debug";

const ADMIN_PANEL_TAB_STORAGE_KEY = "admin-panel-active-tab";

function isAdminPanelTab(value: string | null): value is AdminPanelTab {
	return (
		value === "logs" ||
		value === "brains" ||
		value === "scenario" ||
		value === "debug"
	);
}

export default observer(function DraggableAdminPanel() {
	const nodeRef = useRef<HTMLDivElement>(null);
	const tabGroupName = useId();
	const { startDragging, stopDragging } = useDragging();
	const [activeTab, setActiveTab] = useState<AdminPanelTab>(() => {
		if (typeof window === "undefined") {
			return "logs";
		}

		const persistedTab = window.sessionStorage.getItem(
			ADMIN_PANEL_TAB_STORAGE_KEY,
		);
		return isAdminPanelTab(persistedTab) ? persistedTab : "logs";
	});

	useEffect(() => {
		window.sessionStorage.setItem(ADMIN_PANEL_TAB_STORAGE_KEY, activeTab);
	}, [activeTab]);

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
							className="tabs tabs-lift tabs-sm bg-neutral-800"
						>
							<input
								type="radio"
								name={tabGroupName}
								className="ml-2 tab"
								aria-label="Logs"
								checked={activeTab === "logs"}
								onChange={() => setActiveTab("logs")}
							/>
							<div className="tab-content border-base-300 border-0 border-t rounded-tl-none rounded-tr-none">
								{activeTab === "logs" && <AdminLogs />}
							</div>
							<input
								type="radio"
								name={tabGroupName}
								className="tab"
								aria-label="Brian"
								checked={activeTab === "brains"}
								onChange={() => setActiveTab("brains")}
							/>
							<div className="tab-content border-base-300 border-0 border-t rounded-tl-none rounded-tr-none">
								{activeTab === "brains" && <BrainPanel />}
							</div>
							<input
								type="radio"
								name={tabGroupName}
								className="tab"
								aria-label="Scenario Configuration"
								checked={activeTab === "scenario"}
								onChange={() => setActiveTab("scenario")}
							/>
							<div className="tab-content border-base-300 border-0 border-t rounded-tl-none rounded-tr-none">
								{activeTab === "scenario" && <ScenarioConfigurationPanel />}
							</div>
							<input
								type="radio"
								name={tabGroupName}
								className="tab"
								aria-label="Debug"
								checked={activeTab === "debug"}
								onChange={() => setActiveTab("debug")}
							/>
							<div className="tab-content border-base-300 border-0 border-t rounded-tl-none rounded-tr-none">
								{activeTab === "debug" && <DebugPanel />}
							</div>
						</div>
					</>
				)}
			</div>
		</Draggable>
	);
});
