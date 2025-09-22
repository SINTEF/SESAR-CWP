/* eslint-disable unicorn/filename-case */
declare module "rlite-router" {
	type RliteCallback<State = unknown> = (
		parameters: { [key: string]: string },
		state: State,
		url: string,
	) => void;

	function rlite<State>(
		notFound: RliteCallback<State>,
		routes: { [route: string]: RliteCallback<State> },
		state?: State,
	): (route: string, state?: State) => void;

	export default rlite;
}
