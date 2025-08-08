import { observer } from "mobx-react-lite";
import React from "react";
import Draggable from "react-draggable";

import { isDragging, startDragging, stopDragging } from "../draggableState";
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
	if (!cwpStore.showVerticalWindow) {
		return null;
	}

	return (
		<Draggable
			bounds="parent"
			cancel="input"
			onStart={startDragging}
			onStop={stopDragging}
		>
			<div className="absolute top-[72px] z-[34] right-1/2 w-[500px] shadow-md p-0 m-0 text-[13px] leading-8">
				<div
					className="w-full h-full"
					style={{ height: "100%", width: "100%", background: "#313131" }}
				>
					<SectorSideView />

					<div key={`${1}:${1}`}>
						<div
							className="w-full"
							onClickCapture={(event): void => {
								if (isDragging()) {
									event.stopPropagation();
								}
							}}
						></div>
						{/* <div className="accordion-body sector-configuration-body"> */}
						{/* <div style={{ height: '100%', width: '100%', background: 'black' }}> */}
						{/* <SectorSideView /> */}
						{/* </div> */}
						{/* <VerticalSectorTimeline id={`${1}`} start={0} end={10} current={timestamp} /> */}
						{/* </div> */}
					</div>
					{/* ))} */}
				</div>
			</div>
		</Draggable>
	);
});
