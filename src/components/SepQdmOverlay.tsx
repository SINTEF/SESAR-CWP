import { observer } from "mobx-react-lite";
import { sepQdmStore } from "../state";

export default observer(function SepQdmOverlay() {
	if (!sepQdmStore.isDrawing || !sepQdmStore.startPosition) {
		return null;
	}

	const onMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
		sepQdmStore.setMousePositionFromScreen(event.clientX, event.clientY);
	};

	const onClick = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault();
		sepQdmStore.handleLeftClick();
	};

	const onContextMenu = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault();
		sepQdmStore.disable();
	};

	return (
		<div
			onMouseMove={onMouseMove}
			onClick={onClick}
			onContextMenu={onContextMenu}
			className="fixed inset-0 w-full h-full cursor-crosshair z-600"
		/>
	);
});
