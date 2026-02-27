import type { ComponentPropsWithoutRef } from "react";
import { useSynchronizedBlinkPhaseRed } from "../../utils/useSynchronizedBlink";

type StcaProps = Pick<
	ComponentPropsWithoutRef<"div">,
	"onPointerEnter" | "onPointerLeave"
>;

export default function Stca({ onPointerEnter, onPointerLeave }: StcaProps) {
	const blinkPhaseRed = useSynchronizedBlinkPhaseRed();

	return (
		<div
			className={`flex h-5 px-1 only:px-2 items-center justify-center first:rounded-tl-xs last:rounded-tr-xs font-bold text-xs text-red-600 ${blinkPhaseRed ? "bg-black" : "bg-white"}`}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
		>
			STCA
		</div>
	);
}
