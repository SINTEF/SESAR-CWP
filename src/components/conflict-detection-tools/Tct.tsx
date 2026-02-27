import type { ComponentPropsWithoutRef } from "react";
import { useSynchronizedBlinkPhaseRed } from "../../utils/useSynchronizedBlink";

interface TctProps {
	blink?: boolean;
	onPointerEnter?: ComponentPropsWithoutRef<"div">["onPointerEnter"];
	onPointerLeave?: ComponentPropsWithoutRef<"div">["onPointerLeave"];
}

export default function Tct({
	blink = false,
	onPointerEnter,
	onPointerLeave,
}: TctProps) {
	const blinkPhaseRed = useSynchronizedBlinkPhaseRed();
	const blinkingBackgroundClass = blinkPhaseRed ? "bg-white" : "bg-black";

	return (
		<div
			className={`flex h-5 px-1 only:px-2 items-center justify-center first:rounded-tl-xs last:rounded-tr-xs font-bold text-xs text-red-600 ${blink ? blinkingBackgroundClass : "bg-black"}`}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
		>
			TCT
		</div>
	);
}
