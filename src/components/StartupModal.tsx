import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import * as React from "react";

import {
	getPasswordSalt,
	isAdminModeRequested,
	redirectToAdmin,
} from "../mqtt-client/auth";
import { getBrokerUrl } from "../mqtt-client/mqtt";
import {
	adminStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";
import { load as loadPassword } from "../utils/passwordStore.obs";
import AdminPasswordModal from "./AdminPasswordModal";
import BuildInfoStatusBar from "./BuildInfoStatusBar";
import ControllerSelector from "./ControllerSelector";

/**
 * Check if we're in a valid admin session (admin mode requested AND no error).
 * This means the password was already entered successfully.
 */
function isValidAdminSession(): boolean {
	return isAdminModeRequested() && !adminStore.adminError;
}

function getAdminErrorMessage(code: string | null): string | null {
	if (!code) {
		return null;
	}
	if (code === "4" || code === "5") {
		return "Admin login failed: Invalid credentials";
	}
	if (code === "reconnect") {
		return "Admin login failed: Could not connect to server";
	}
	if (code === "no-password") {
		return "Admin session expired. Please log in again.";
	}
	return `Admin login failed: ${code}`;
}

/**
 * Startup modal shown when the application launches.
 * Allows users to select their controller role and access admin mode.
 */
export default observer(function StartupModal() {
	const posthog = usePostHog();
	const { showControllerSelection } = cwpStore;
	const [showPasswordModal, setShowPasswordModal] = React.useState(false);
	const handleAdminModeClick = async (): Promise<void> => {
		posthog?.capture("admin_mode_button_clicked", {
			is_in_admin_mode: isInAdminMode,
			has_admin_error: Boolean(adminStore.adminError),
		});

		if (isInAdminMode) {
			// Already in admin mode, just show panel and select All
			adminStore.setAdminPanel(true);
			configurationStore.setCurrentCWP("All");
			cwpStore.setPseudoPilot(false);
			cwpStore.toggleControllerSelection();
			posthog?.capture("admin_panel_opened_from_startup", {
				mode: "already_authenticated",
			});
			return;
		}

		// Check if password is already stored
		const brokerUrl = getBrokerUrl();
		const salt = getPasswordSalt(brokerUrl);
		const storedPassword = await loadPassword(salt);

		if (storedPassword) {
			posthog?.capture("admin_mode_redirect_requested", {
				reason: "stored_password",
			});
			redirectToAdmin();
			return;
		}

		posthog?.capture("admin_password_modal_opened", {
			reason: "no_stored_password",
		});
		setShowPasswordModal(true);
	};

	const listOfControllers = roleConfigurationStore.listOfAllControllers;
	const pseudoPilots = roleConfigurationStore.listOfAllPseudoControllers;
	const controller = configurationStore.currentCWP;
	const controllersWithoutAll = listOfControllers.filter(
		(cwp) => cwp !== "All",
	);
	const listOfAll = [...controllersWithoutAll, ...pseudoPilots, "All"];

	// Check if currently in a valid admin session (admin requested and no error)
	const isInAdminMode = isValidAdminSession();

	// If in valid admin mode, auto-select "All" controller and skip the modal
	React.useEffect(() => {
		if (isInAdminMode) {
			// Enable admin mode in store
			if (!adminStore.adminModeEnabled) {
				adminStore.setAdminMode(true);
				adminStore.setAdminPanel(true);
			}
			// Auto-select "All" (master) controller and close the modal
			if (showControllerSelection && controller !== "All") {
				configurationStore.setCurrentCWP("All");
				cwpStore.setPseudoPilot(false);
				cwpStore.toggleControllerSelection();
			}
		}
	}, [isInAdminMode, showControllerSelection, controller]);

	// True if the controller has already been selected
	const secondSelection = listOfAll.includes(controller);

	if (!showControllerSelection) {
		return null;
	}

	return (
		<>
			{/* Modal backdrop */}
			<div
				className="modal modal-open"
				onClick={
					secondSelection
						? () => cwpStore.toggleControllerSelection()
						: undefined
				}
			>
				<div
					className="modal-box max-w-2xl bg-black/50 backdrop-blur-md"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Modal header */}
					<h3 className="font-semibold text-lg text-white mb-4">
						Choose Controller
					</h3>
					{secondSelection && (
						<button
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							onClick={() => cwpStore.toggleControllerSelection()}
						>
							✕
						</button>
					)}

					{/* Controller selection */}
					<ControllerSelector
						onSelect={(): void => cwpStore.toggleControllerSelection()}
					/>

					{/* Admin mode section */}
					<div className="flex flex-wrap gap-2 mt-4 items-center">
						<button
							onClick={handleAdminModeClick}
							// className={`btn ${isInAdminMode ? "btn-warning" : "btn-outliine border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-black"}`}
							className={`btn ${isInAdminMode ? "btn-warning" : "btn-error"}`}
						>
							Admin Mode
						</button>

						{/* Show admin error if any */}
						{adminStore.adminError && (
							<div className="flex items-center gap-2">
								<span className="text-error text-sm">
									{getAdminErrorMessage(adminStore.adminError)}
								</span>
								<button
									type="button"
									className="btn btn-ghost btn-xs"
									onClick={() => {
										posthog?.capture("admin_error_cleared", {
											error: adminStore.adminError,
										});
										adminStore.clearAdminError();
									}}
								>
									✕
								</button>
							</div>
						)}
					</div>

					{/* Build information status bar */}
					<BuildInfoStatusBar />
				</div>
			</div>

			{/* Admin password modal */}
			<AdminPasswordModal
				isOpen={showPasswordModal}
				onClose={() => setShowPasswordModal(false)}
			/>
		</>
	);
});
