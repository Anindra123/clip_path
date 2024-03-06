import GetPolygonCenter from "../util/GetPolygonCenter";

interface usePointerScaleProps {
    activePreset: { x: number, y: number }[];
    setActivePreset: React.Dispatch<React.SetStateAction<{ x: number, y: number }[]>>
}

export default function usePointerScale({ activePreset, setActivePreset }: usePointerScaleProps) {


    function handleScale(e: WheelEvent) {
        e.preventDefault();
        const new_path: { x: number; y: number }[] = [];
        const temp_path = [...activePreset];
        if (e.ctrlKey && e.deltaY) {
            const scaleFactor = e.deltaY < 1 ? 1.05 : 0.98;
            const polygon_center = GetPolygonCenter([...activePreset]);
            let isBoundaryCrossed = false;

            temp_path.forEach((path) => {
                const { x, y } = { ...path };
                const distance_x = x - polygon_center.x;
                const distance_y = y - polygon_center.y;

                const scaled_x = distance_x * scaleFactor;
                const scaled_y = distance_y * scaleFactor;

                const newX = scaled_x + polygon_center.x;
                const newY = scaled_y + polygon_center.y;

                if (newX > 100 || newX < 0 || newY > 100 || newY < 0)
                    isBoundaryCrossed = true;

                new_path.push({ x: newX, y: newY });
            });
            setActivePreset((prev) => {
                return isBoundaryCrossed ? prev : new_path;
            });
        }
    }

    return [handleScale] as const;

}