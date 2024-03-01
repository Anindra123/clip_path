export default function PixelToPercentage(max_value: number, value: number) {
    return Math.round(100 * (value / max_value));
}