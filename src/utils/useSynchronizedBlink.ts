import { useSyncExternalStore } from "react";

const BLINK_PERIOD_MS = 1000;
const BLINK_HALF_PERIOD_MS = BLINK_PERIOD_MS / 2;

const listeners = new Set<() => void>();
let timeoutId: ReturnType<typeof setTimeout> | null = null;

function emitChange(): void {
	for (const listener of listeners) {
		listener();
	}
}

function scheduleNextTick(): void {
	if (listeners.size === 0) {
		timeoutId = null;
		return;
	}

	const now = Date.now();
	const msToNextHalfSecond =
		BLINK_HALF_PERIOD_MS - (now % BLINK_HALF_PERIOD_MS);

	timeoutId = setTimeout(() => {
		emitChange();
		scheduleNextTick();
	}, msToNextHalfSecond);
}

function subscribe(listener: () => void): () => void {
	listeners.add(listener);

	if (listeners.size === 1 && timeoutId === null) {
		scheduleNextTick();
	}

	return () => {
		listeners.delete(listener);
		if (listeners.size === 0 && timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};
}

function getBlinkPhaseRedSnapshot(): boolean {
	return Date.now() % BLINK_PERIOD_MS < BLINK_HALF_PERIOD_MS;
}

export function useSynchronizedBlinkPhaseRed(): boolean {
	return useSyncExternalStore(
		subscribe,
		getBlinkPhaseRedSnapshot,
		getBlinkPhaseRedSnapshot,
	);
}
