export function formatPrice(price) {
    const formattedNumber = parseFloat(price).toLocaleString("en-EN", {
        minimumFractionDigits: 2,
    });
    return formattedNumber;
}
