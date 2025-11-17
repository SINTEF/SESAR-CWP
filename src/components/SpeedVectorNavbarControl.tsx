import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import { cwpStore } from "../state";

export default observer(function SpeedVectorNavbarControl() {
	const posthog = usePostHog();
	const {
		speedVectorMinutes,
		setSpeedVectorMinutes,
		showSpeedVectors,
		toggleShowSpeedVectors,
	} = cwpStore;

	const handleToggleSpeedVectors = (): void => {
		toggleShowSpeedVectors();
		posthog?.capture("speed_vectors_toggled", {
			enabled: !showSpeedVectors,
			current_minutes: speedVectorMinutes,
		});
	};

	const handleSetMinutes = (minutes: number): void => {
		setSpeedVectorMinutes(minutes);
		posthog?.capture("speed_vector_duration_changed", {
			previous_minutes: speedVectorMinutes,
			new_minutes: minutes,
			vectors_enabled: showSpeedVectors,
		});
	};

	const predefinedValues = [1, 2, 3, 4, 6, 9];

	return (
		<div className="flex btn-group">
			<button
				type="button"
				className={classNames(
					"h-full text-white text-xs bg-[#1e3a5f] rounded-none overflow-hidden whitespace-nowrap shrink",
					"hover:bg-[#2a5d8f] active:bg-[#366fa3]",
					"focus:outline-none focus:shadow-none focus:bg-[#3f77b2] p-2 pt-1 pb-1",
					showSpeedVectors && "bg-[#4b90db]",
				)}
				onClick={handleToggleSpeedVectors}
			>
				VV
			</button>
			{predefinedValues.map((val) => (
				<button
					key={val}
					type="button"
					className={classNames(
						"h-full text-white text-xs bg-[#1e3a5f] rounded-none overflow-hidden whitespace-nowrap shrink",
						"hover:bg-[#2a5d8f] active:bg-[#366fa3]",
						"focus:outline-none focus:shadow-none focus:bg-[#3f77b2] p-2 pt-1 pb-1",
						speedVectorMinutes === val && "bg-[#4b90db]",
					)}
					onClick={() => handleSetMinutes(val)}
				>
					{val}
				</button>
			))}
		</div>
	);
});
