export function formatPrice(price) {
    const formattedNumber = parseFloat(price).toLocaleString("en-EN", {
        minimumFractionDigits: 0,
    });
    if (formattedNumber !== "NaN") {
        return formattedNumber;
    } else {
        return null;
    }
}
