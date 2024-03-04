export default function GetPolygonArea(points: { x: number, y: number }[]) {
    let sum = 0;
    for (let index = 0; index < points.length; index++) {
        const curr_point = points[index];
        const next_point = points[index === points.length - 1 ? 0 : index + 1];
        sum += ((curr_point.x * next_point.y) - (next_point.x * curr_point.y));

    }
    return 0.5 * Math.abs(sum);
}