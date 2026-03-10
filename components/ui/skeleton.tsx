import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-muted flex items-center justify-center", className)}
			{...props}
		>
			<Spinner />
		</div>
	);
}

export { Skeleton };
