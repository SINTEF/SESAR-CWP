import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import {
	fastForwardSimulator,
	handlePublishPromise,
	pauseSimulator,
	restartSimulator,
	startSimulator,
} from "../../mqtt-client/publishers";
import { adminStore } from "../../state";

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

	useEffect(() => {
		const disposer = reaction(
			() => adminStore.simulationRestarted,
			(simulationRestarted) => {
				if (simulationRestarted) {
					window.location.reload();
				}
			},
		);

		return () => {
			disposer();
		};
	}, []);

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

export default AdminControlButtons;
