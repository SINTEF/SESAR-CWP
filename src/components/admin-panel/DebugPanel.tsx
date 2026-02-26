import { observer } from "mobx-react-lite";
import { useState } from "react";

import { adminStore } from "../../state";
import BuildInfoStatusBar from "../BuildInfoStatusBar";

const createCatImageUrl = () => `https://cataas.com/cat?t=${Date.now()}`;

const handleCaptureSentryError = () => {
	throw new Error("This is a test error sent to Sentry from the Debug Panel");
};

export default observer(function DebugPanel() {
	const [catImageUrl, setCatImageUrl] = useState<string | null>(null);
	const latestPresence = adminStore.latestPresence;

	const handleShowCat = () => {
		setCatImageUrl(createCatImageUrl());
	};

	return (
		<div className="bg-base-200 p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-base-content">Debug</h3>
			</div>

			<div className="rounded-md bg-base-100 p-3 text-sm space-y-3">
				<button
					type="button"
					className="btn btn-sm btn-warning"
					onClick={handleCaptureSentryError}
				>
					Send Fake Sentry Error
				</button>
			</div>

			<div className="rounded-md bg-base-100 p-3 text-sm space-y-3">
				<div className="flex items-center justify-between">
					<button
						type="button"
						className="btn btn-sm btn-warning"
						onClick={handleShowCat}
					>
						Cat.
					</button>
				</div>

				{catImageUrl && (
					<div className="flex justify-center">
						<div className="hover-3d w-fit">
							<figure className="rounded-2xl bg-base-300 overflow-hidden inline-flex items-center justify-center max-w-80 max-h-56">
								<img
									src={catImageUrl}
									alt="Random cat"
									className="block w-auto h-auto max-w-80 max-h-56 object-contain"
									referrerPolicy="no-referrer"
									crossOrigin="anonymous"
								/>
							</figure>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				)}
			</div>

			{adminStore.hasRapidPresenceSessionSwitching && (
				<div className="alert alert-warning">
					<span className="text-lg font-bold">
						Warning: rapid session switches detected. Two simulators might be
						running at the same time.
					</span>
				</div>
			)}

			<div className="rounded-md bg-base-100 p-3 text-sm space-y-1">
				<div className="font-semibold">Latest presence message</div>
				{latestPresence ? (
					<>
						<div>Session UUID: {latestPresence.sessionUuid}</div>
						<div>
							Payload:{" "}
							{latestPresence.isDisconnected
								? "<empty retained payload - disconnected>"
								: `${latestPresence.sequence}|${latestPresence.utcIso8601}`}
						</div>
						<div>Received at: {latestPresence.receivedAt}</div>
					</>
				) : (
					<div className="text-base-content/70">
						No presence message received yet.
					</div>
				)}
			</div>

			<BuildInfoStatusBar compact />
		</div>
	);
});
