import type { ComponentPropsWithoutRef } from "react";

type StcaProps = Pick<
	ComponentPropsWithoutRef<"div">,
	"onPointerEnter" | "onPointerLeave"
>;

export default function Stca({ onPointerEnter, onPointerLeave }: StcaProps) {
	return (
		<div
			className="flex h-5 px-1 only:px-2 items-center justify-center first:rounded-tl-xs last:rounded-tr-xs font-bold text-xs text-red-600 animate-alert-blink"
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
		>
			STCA
		</div>
	);
}
