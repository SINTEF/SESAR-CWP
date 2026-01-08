/**
 * Status bar component displaying build information (version, revision, build time).
 * Shows "Development Mode" when no build info is available.
 * Shown at the bottom of the startup modal.
 */
export default function BuildInfoStatusBar() {
	const version = import.meta.env.VITE_VERSION;
	const revision = import.meta.env.VITE_REVISION;
	const buildtime = import.meta.env.VITE_BUILDTIME;

	const hasBuildInfo = version || revision || buildtime;

	const formatBuildTime = (timestamp: string | undefined): string | null => {
		if (!timestamp) {
			return null;
		}
		try {
			const date = new Date(timestamp);
			return date.toLocaleString();
		} catch {
			return timestamp;
		}
	};

	const formattedBuildTime = formatBuildTime(buildtime);

	// Show "Development Mode" if no production build info is available
	if (!hasBuildInfo) {
		return (
			<footer className="mt-6 pt-4 border-t border-base-300">
				<div className="flex flex-wrap items-center justify-center gap-2 text-xs text-base-content/60">
					<div className="badge badge-ghost badge-sm">Development Mode</div>
				</div>
			</footer>
		);
	}

	return (
		<footer className="mt-6 pt-4 border-t border-base-300">
			<div className="flex flex-wrap items-center justify-center gap-2 text-xs text-base-content/60">
				{version && <div className="badge badge-ghost badge-sm">{version}</div>}
				{revision && (
					<div className="badge badge-ghost badge-sm font-mono">{revision}</div>
				)}
				{formattedBuildTime && (
					<div className="badge badge-ghost badge-sm">
						Built: {formattedBuildTime}
					</div>
				)}
			</div>
		</footer>
	);
}
