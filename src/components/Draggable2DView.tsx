import { observer } from "mobx-react-lite";
import { useRef } from "react";
import Draggable from "react-draggable";

import { useDragging } from "../contexts/DraggingContext";
import { cwpStore } from "../state";
import SectorSideView from "./SectorSideView/SectorSideView";

// function ChangeToLocaleTime(time: number): string {
//   const date = new Date(time * 1000);
//   const localeTime = date.toLocaleTimeString('en-GB', {
//     timeZone: 'UTC',
//     hour12: false,
//     hour: '2-digit',
//     minute: '2-digit',
//   });
//   return localeTime;
// }

export default observer(function Draggable2DView() {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { isDragging, startDragging, stopDragging } = useDragging();

	if (!cwpStore.showVerticalWindow) {
		return null;
	}

	return (
		<Draggable
			nodeRef={nodeRef}
			bounds="parent"
			cancel="input"
			onStart={startDragging}
			onStop={stopDragging}
		>
			<div
				ref={nodeRef}
				className="absolute top-[72px] z-[34] right-1/2 w-[500px] shadow-md p-0 m-0 text-[13px] leading-8"
			>
				<div
					className="w-full h-full"
					style={{ height: "100%", width: "100%", background: "#313131" }}
				>
					<SectorSideView />

					<div key={`${1}:${1}`}>
						<div
							className="w-full"
							onClickCapture={(event): void => {
								if (isDragging) {
									event.stopPropagation();
								}
							}}
						></div>
					</div>
				</div>
			</div>
		</Draggable>
	);
});
