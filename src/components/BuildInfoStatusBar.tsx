/**
 * Status bar component displaying build information (version, revision, build time).
 * Shows "Development Mode" when no build info is available.
 * Shown at the bottom of the startup modal.
 */
type BuildInfoStatusBarProps = {
	compact?: boolean;
};

export default function BuildInfoStatusBar({
	compact = false,
}: BuildInfoStatusBarProps) {
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
	const footerClasses = compact ? "" : "mt-6 pt-4 border-t border-base-300";
	const contentClasses = compact
		? "flex flex-wrap items-center gap-2 text-xs text-base-content/60"
		: "flex flex-wrap items-center justify-center gap-2 text-xs text-base-content/60";

	// Show "Development Mode" if no production build info is available
	if (!hasBuildInfo) {
		return (
			<footer className={footerClasses}>
				<div className={contentClasses}>
					<div className="badge badge-ghost badge-sm">Development Mode</div>
				</div>
			</footer>
		);
	}

	return (
		<footer className={footerClasses}>
			<div className={contentClasses}>
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
