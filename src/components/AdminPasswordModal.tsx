import * as Sentry from "@sentry/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { getPasswordSalt, redirectToAdmin } from "../mqtt-client/auth";
import { getBrokerUrl } from "../mqtt-client/mqtt";
import { persist } from "../utils/passwordStore.obs";

interface AdminPasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default observer(function AdminPasswordModal({
	isOpen,
	onClose,
}: AdminPasswordModalProps) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!isOpen) {
		return null;
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			const brokerUrl = getBrokerUrl();
			const salt = getPasswordSalt(brokerUrl);

			await persist(password, salt);

			// Redirect to admin mode (this will reload the page)
			redirectToAdmin();
		} catch (persistError) {
			Sentry.captureException(persistError);
			setError(
				persistError instanceof Error
					? persistError.message
					: "Failed to save password",
			);
			setIsSubmitting(false);
		}
	};

	const handleClose = () => {
		setPassword("");
		setError(null);
		onClose();
	};

	return (
		<div className="modal modal-open" onClick={handleClose}>
			<div className="modal-box w-96" onClick={(e) => e.stopPropagation()}>
				<button
					type="button"
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					onClick={handleClose}
				>
					✕
				</button>

				<h2 className="mb-6 text-2xl font-bold">Admin Mode</h2>

				<form onSubmit={handleSubmit}>
					<fieldset disabled={isSubmitting}>
						{/* Password Input */}
						<div className="mb-6">
							<label className="mb-2 block text-sm font-medium">Password</label>
							<input
								type="password"
								className="input input-bordered w-full"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter admin password"
								autoFocus
								required
							/>
						</div>

						{/* Error Message */}
						{error && (
							<div className="alert alert-error mb-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 shrink-0 stroke-current"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z"
									/>
								</svg>
								<span>{error}</span>
							</div>
						)}

						{/* Action Buttons */}
						<div className="card-actions flex gap-3">
							<button
								type="button"
								className="btn btn-ghost flex-1"
								onClick={handleClose}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn btn-primary flex-1"
								disabled={!password}
							>
								{isSubmitting ? (
									<span className="loading loading-spinner loading-sm" />
								) : (
									"Login"
								)}
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
});
