export default function formatAmount(num: number): string {
    if (num >= 10000000) {
        return (num / 10000000).toFixed(1).replace(/\.0$/, '') + ' crore';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(1).replace(/\.0$/, '') + ' lakh';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
        return num?.toString();
    }
}