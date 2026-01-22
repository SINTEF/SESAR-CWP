import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import { Popup, useMap } from "react-map-gl/maplibre";
import type SepQdmSeparation from "../model/SepQdmSeparation";
import { sepQdmStore } from "../state";

const QdmLabelPopup = observer(function QdmLabelPopup({
	separation,
}: {
	separation: SepQdmSeparation;
}) {
	const { current } = useMap();
	const posthog = usePostHog();

	// Skip if separation is no longer valid
	if (!separation.isValid) {
		return null;
	}

	const midpoint = separation.midpoint;
	const distanceNM = separation.distanceNM;
	const cpaResult = separation.cpaResult;

	// Should never happen due to isValid check, but satisfy TypeScript
	if (!midpoint || distanceNM === null) {
		return null;
	}

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault();
		sepQdmStore.removeQdmLine(separation.fromId, separation.toId);
		posthog.capture("qdm_line_removed", {
			from_aircraft_id: separation.fromId,
			to_aircraft_id: separation.toId,
		});
	};

	const onWheel = (event: React.WheelEvent): void => {
		const map = current?.getMap();
		if (map?.scrollZoom?.wheel) {
			(map.scrollZoom.wheel as (event: unknown) => void)({
				...event,
				preventDefault: () => {},
			});
		}
	};

	return (
		<Popup
			longitude={midpoint[0]}
			latitude={midpoint[1]}
			anchor="center"
			closeButton={false}
			closeOnClick={false}
			className="max-w-none"
		>
			<div
				className="px-2 py-1 text-xs select-none bg-gray-800/70 backdrop-blur-[1.5px] rounded-sm cursor-pointer hover:text-sm transition-all"
				style={{ color: separation.color }}
				onContextMenu={handleContextMenu}
				onWheel={onWheel}
			>
				<div>{distanceNM.toFixed(1)}&nbsp;Nm</div>
				{cpaResult && (
					<div>CPA&nbsp;:&nbsp;{cpaResult.distanceNM.toFixed(1)}&nbsp;Nm</div>
				)}
			</div>
		</Popup>
	);
});

export default observer(function QdmLabelPopups() {
	return (
		<>
			{sepQdmStore.savedQdmLines.map((separation) => (
				<QdmLabelPopup
					key={`qdm-label-${separation.fromId}-${separation.toId}`}
					separation={separation}
				/>
			))}
		</>
	);
});
