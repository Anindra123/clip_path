export default function debounce(callback: () => void, time: number) {
    let timeout_id: number = 0;

    return function () {
        clearTimeout(timeout_id);
        timeout_id = setTimeout(() => {
            callback()
        }, time);
    }
}