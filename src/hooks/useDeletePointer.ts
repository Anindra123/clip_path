import { useEffect, useState } from "react";

interface useDeletePointerProps {
    path: { x: number, y: number }[],
    setActivePreset: React.Dispatch<React.SetStateAction<{ x: number, y: number }[]>>
}

export default function useDeletePointer({ path, setActivePreset }: useDeletePointerProps) {
    const [errorMessage, setErrorMessage] = useState("");
    const [deletedPoints, setDeletedPoints] = useState<number[]>([]);
    function handleDelete(e: KeyboardEvent) {
        e.preventDefault();

        if (e.key === "Backspace") {
            const temp_points = [...path];
            console.log(errorMessage);
            setErrorMessage("");

            if (temp_points.length > 3) {
                const filtered_points = temp_points.filter((point, idx) => {
                    if (!deletedPoints.includes(idx)) return point;
                });
                setDeletedPoints([]);
                setActivePreset(filtered_points);
            } else {
                setErrorMessage("Minimum 3 pointers are required");
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keyup", handleDelete);
        return () => window.removeEventListener("keyup", handleDelete);
    });
    return [deletedPoints, errorMessage, setDeletedPoints, setErrorMessage] as const

}