import { useEffect, useState } from "react";

import {
	type ConnectionErrorState,
	getConnectionErrorState,
	onConnectionError,
} from "../mqtt-client/mqtt";

function getErrorMessage(errorCode?: string | number): string {
	if (errorCode === 4 || errorCode === 5) {
		return "Authentication failed. The server rejected the connection credentials.";
	}
	if (errorCode === "reconnect") {
		return "Unable to connect to the server. Please check your network connection.";
	}
	if (errorCode === "no-password") {
		return "Admin password was not found. Please log in again.";
	}
	return "Failed to connect to the MQTT server. Please try again later.";
}

export default function ConnectionErrorModal() {
	const [errorState, setErrorState] = useState<ConnectionErrorState>(
		getConnectionErrorState,
	);

	useEffect(() => {
		return onConnectionError(setErrorState);
	}, []);

	// Only show for public mode errors (admin errors redirect)
	if (!errorState.hasError || errorState.isAdminMode) {
		return null;
	}

	const handleRetry = () => {
		window.location.reload();
	};

	return (
		<div className="modal modal-open">
			<div className="modal-box max-w-md">
				<h3 className="font-bold text-lg text-error mb-4">Connection Error</h3>

				<p className="mb-4">{getErrorMessage(errorState.errorCode)}</p>

				<div className="modal-action">
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleRetry}
					>
						Retry
					</button>
				</div>
			</div>
		</div>
	);
}
