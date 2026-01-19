import { observer } from "mobx-react-lite";
import type AircraftModel from "../model/AircraftModel";
import { frequenciesStore, sectorStore } from "../state";

interface TransferFrequencyButtonProps {
	aircraft: AircraftModel;
	onClick: () => void;
}

/**
 * Button that displays the radio frequency for an aircraft's current sector.
 * The frequency is looked up from the FrequenciesStore based on the aircraft's current position.
 */
export default observer(function TransferFrequencyButton({
	aircraft,
	onClick,
}: TransferFrequencyButtonProps) {
	const frequency = frequenciesStore.getFrequencyForAircraftCurrentSector(
		aircraft,
		sectorStore,
	);

	// Format the frequency for display, or show a fallback
	const frequencyLabel = frequency
		? frequenciesStore.formatFrequency(frequency)
		: "---";

	return (
		<button
			onClick={onClick}
			className="btn btn-xs btn-primary w-full rounded-xs"
		>
			TRF {frequencyLabel}
		</button>
	);
});
