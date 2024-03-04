export default function GetPolygonCenter(points: { x: number, y: number }[]) {
    let x_value = 0;
    let y_value = 0;

    points.forEach((point) => {
        x_value += point.x;
        y_value += point.y;
    })

    return {
        x: x_value / points.length
        , y: y_value / points.length
    } as const

}