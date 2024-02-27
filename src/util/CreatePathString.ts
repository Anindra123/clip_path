export default function CreatePathString(paths: { x: number, y: number }[]) {
    let path_string = "polygon(";

    paths.forEach((path) => {
        path_string += `${path.x}% `;
        path_string += `${path.y}%,`;
    })

    return path_string.slice(0, -1) + ")";
}