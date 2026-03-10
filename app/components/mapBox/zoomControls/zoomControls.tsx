import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useMap } from "react-leaflet";

export default function ZoomControls() {
	const mapControl = useMap();

	return (
		<ButtonGroup
			orientation="vertical"
			aria-label="Map controls"
			className="h-fit z-[1001] absolute ml-2 mt-2 shadow-lg"
		>
			<Button
				variant="outline"
				size="icon"
				onClick={() => {
					mapControl.zoomIn();
				}}
			>
				<PlusIcon size={18} />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => {
					mapControl.zoomOut();
				}}
			>
				<MinusIcon size={18} />
			</Button>
		</ButtonGroup>
	);
}
