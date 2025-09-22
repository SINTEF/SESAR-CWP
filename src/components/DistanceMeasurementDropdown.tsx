import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";

import { cwpStore, distanceLineStore } from "../state";

export default observer(function DistanceMeasurementDropdown() {
	const posthog = usePostHog();
	/* eslint-disable @typescript-eslint/unbound-method */
	const { currentDistanceColor, setCurrentDistanceColor } = cwpStore;
	const { removeColor } = distanceLineStore;
	/* eslint-enable @typescript-eslint/unbound-method */

	const removeDistance = (): void => {
		if (currentDistanceColor !== "") {
			removeColor(currentDistanceColor);
			posthog?.capture("distance_measurement_removed", {
				color: currentDistanceColor,
				action: "cancel",
			});
		}
		setCurrentDistanceColor("");
	};

	const selectDistanceColor = (color: string, name: string): void => {
		setCurrentDistanceColor(color);
		posthog?.capture("distance_measurement_selected", {
			color: color,
			name: name,
			previous_color: currentDistanceColor || null,
		});
	};

	return (
		<div className="dropdown dropdown-top">
			<label
				tabIndex={0}
				className="btn btn-sm m-1"
				style={{
					backgroundColor: currentDistanceColor || "#aaaaaa",
					color: currentDistanceColor ? "black" : "white",
				}}
			>
				R&amp;B
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<a
						onClick={(): void => selectDistanceColor("#ffff00", "R&B1")}
						style={{ color: "#ffff00" }}
					>
						R&amp;B1
					</a>
				</li>
				<li>
					<a
						onClick={(): void => selectDistanceColor("#b7fa2e", "R&B2")}
						style={{ color: "#b7fa2e" }}
					>
						R&amp;B2
					</a>
				</li>
				<li>
					<a
						onClick={(): void => selectDistanceColor("#ed70d1", "R&B3")}
						style={{ color: "#ed70d1" }}
					>
						R&amp;B3
					</a>
				</li>
				<li>
					<a
						onClick={(): void => selectDistanceColor("#fdcb09", "R&B4")}
						style={{ color: "#fdcb09" }}
					>
						R&amp;B4
					</a>
				</li>
				<li className="divider"></li>
				<li className={currentDistanceColor === "" ? "disabled" : ""}>
					<a onClick={(): void => removeDistance()}>CNL</a>
				</li>
			</ul>
		</div>
	);
});
