import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import * as React from "react";

import { configurationStore, cwpStore, roleConfigurationStore } from "../state";

export default observer(function ControllerModal() {
	const posthog = usePostHog();
	const { showControllerSelection, toggleControllerSelection, setPseudoPilot } =
		cwpStore;
	const [selectedCWP, setSelectedCWP] = React.useState<string>("");
	const listOfControllers = roleConfigurationStore.listOfAllControllers;
	const pseudoPilots = roleConfigurationStore.listOfAllPseudoControllers;
	const controller = configurationStore.currentCWP;
	const controllersWithoutAll = listOfControllers.filter(
		(cwp) => cwp !== "All",
	);
	const listOfAll = [...controllersWithoutAll, ...pseudoPilots, "All"];

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
					</div>
				</div>
			</div>
		</>
	);
});
