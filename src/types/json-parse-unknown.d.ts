declare global {
	interface JSON {
		parse(text: string, reviver?: (this: unknown, key: string, value: unknown) => unknown): unknown;
	}
}

export {};