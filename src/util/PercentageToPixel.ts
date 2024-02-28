export default function PercentageToPixel(max_value: number, percent_value: number) {
    return max_value * (percent_value / 100);
}