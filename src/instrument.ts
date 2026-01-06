import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN;

if (dsn && import.meta.env.PROD) {
	Sentry.init({ dsn });
}
