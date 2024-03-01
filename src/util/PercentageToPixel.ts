export default function PercentageToPixel(max_value: number, percent_value: number) {
    return Math.round(max_value * (percent_value / 100));
}