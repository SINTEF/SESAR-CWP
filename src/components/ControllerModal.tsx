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

export default observer(function ControllerModal() {
	const posthog = usePostHog();
	const { showControllerSelection, toggleControllerSelection, setPseudoPilot } =
		cwpStore;
	const [selectedCWP, setSelectedCWP] = React.useState<string>("");
	const [showPasswordModal, setShowPasswordModal] = React.useState(false);
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
				toggleControllerSelection();
			}
		}
	}, [
		isInAdminMode,
		showControllerSelection,
		controller,
		toggleControllerSelection,
	]);

	const collator = new Intl.Collator([], { numeric: true });
	pseudoPilots.sort((a, b) => collator.compare(a, b));
	controllersWithoutAll.sort((a, b) => collator.compare(a, b));

	const handleSelect = (targetValue: string): void => {
		const valueSplit = targetValue.split(" ");
		const cwp = valueSplit[0];
		setSelectedCWP(targetValue);
		const pseudo = valueSplit[1];
		const isPseudoPilot = pseudo === "PseudoPilot";

		if (isPseudoPilot) {
			setPseudoPilot(true);
		} else {
			setPseudoPilot(false);
		}

		const previousController = controller;
		configurationStore.setCurrentCWP(cwp);

		posthog.setPersonProperties({
			controller: cwp,
			is_pseudo_pilot: isPseudoPilot,
		});

		posthog?.capture("controller_selected", {
			previous_controller: previousController,
			new_controller: cwp,
			controller_type:
				cwp === "All"
					? "master"
					: isPseudoPilot
						? "pseudo_pilot"
						: "controller",
			is_pseudo_pilot: isPseudoPilot,
			available_controllers: listOfControllers,
			available_pseudo_pilots: pseudoPilots,
		});

		toggleControllerSelection();
	};

	// True if the controller has already been selected
	const secondSelection = listOfAll.includes(controller);

	const isLoading = listOfAll.length === 1;

	if (!showControllerSelection) {
		return null;
	}

	return (
		<>
			{/* Modal backdrop */}
			<div
				className="modal modal-open"
				onClick={
					secondSelection ? () => toggleControllerSelection() : undefined
				}
			>
				<div
					className="modal-box max-w-2xl"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Modal header */}
					<h3 className="font-bold text-lg mb-4">Choose Controller</h3>
					{secondSelection && (
						<button
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							onClick={() => toggleControllerSelection()}
						>
							✕
						</button>
					)}

					{/* Modal body */}
					<div className="py-4">
						{isLoading ? (
							<div className="flex flex-col items-center">
								<span className="loading loading-spinner loading-lg text-primary"></span>
								<br />
								<br />
							</div>
						) : null}

						{/* Controllers group */}
						<div className="flex flex-wrap gap-2 mb-4">
							{controllersWithoutAll.map((name) => (
								<button
									key={name}
									onClick={() => handleSelect(name)}
									className={`btn ${selectedCWP === name ? "btn-primary" : "btn-outline"}`}
								>
									{name}
								</button>
							))}
						</div>

						{/* Pseudo pilots group */}
						{pseudoPilots.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{pseudoPilots.map((name) => (
									<button
										key={name}
										onClick={() => handleSelect(name)}
										className={`btn ${selectedCWP === name ? "btn-primary" : "btn-outline"}`}
									>
										{name}
									</button>
								))}
							</div>
						)}

						{/* Master button */}
						<div className="flex flex-wrap gap-2">
							<button
								onClick={() => handleSelect("All")}
								className={`btn ${selectedCWP === "All" ? "btn-primary" : "btn-outline"}`}
							>
								Master
							</button>
						</div>

						{/* Admin mode */}
						<div className="flex flex-wrap gap-2 mt-4 items-center">
							<button
								onClick={async () => {
									if (isInAdminMode) {
										// Already in admin mode, just select All and show panel
										adminStore.setAdminPanel(true);
										handleSelect("All");
									} else {
										// Check if password is already stored
										const brokerUrl = getBrokerUrl();
										const salt = getPasswordSalt(brokerUrl);
										const storedPassword = await loadPassword(salt);

										if (storedPassword) {
											// Password exists, redirect directly to admin mode
											redirectToAdmin();
										} else {
											// No password stored, show the password modal
											setShowPasswordModal(true);
										}
									}
								}}
								className={`btn ${isInAdminMode ? "btn-primary" : "btn-outline"}`}
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
										onClick={() => adminStore.clearAdminError()}
									>
										✕
									</button>
								</div>
							)}
						</div>
					</div>
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
