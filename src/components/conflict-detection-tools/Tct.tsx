import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const BLINK_INTERVAL = 500; // ms

export default observer(function Tct() {
	const [blink, setBlink] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => setBlink((b) => !b), BLINK_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className={`flex h-5 w-10 items-center justify-center rounded-t-xs font-bold text-xs text-red-600 transition-colors duration-200 ${
				blink ? "bg-white" : "bg-black"
			}`}
		>
			TCT
		</div>
	);
});
