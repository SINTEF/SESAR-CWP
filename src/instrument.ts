import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN;

if (dsn && import.meta.env.PROD) {
	const version = import.meta.env.VITE_VERSION;
	const revision = import.meta.env.VITE_REVISION;
	const buildtime = import.meta.env.VITE_BUILDTIME;

	Sentry.init({
		dsn,
		// Release identifier: version + short commit hash
		release: version && revision ? `${version}+${revision}` : version,
		environment: "production",
		// Initial context with build metadata
		initialScope: {
			tags: {
				...(version && { version }),
				...(revision && { revision }),
				...(buildtime && { buildtime }),
			},
		},
	});
}
