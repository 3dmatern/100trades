export function getTimeInTrade(start, end) {
    let startDate;
    let endDate;

    if (start && end) {
        startDate = new Date(start);
        endDate = new Date(end);
    } else if (start && !end) {
        startDate = new Date(start);
        endDate = new Date();
    }

    // Вычислить разницу в миллисекундах
    const timeDifference = endDate - startDate;

    // Извлечь часы и минуты из разницы в миллисекундах
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    // const minutes = Math.floor(
    //     (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    // );

    return `${hours} ч.`;
}

export function dealDateWithTime(date) {
    const oldDate = new Date(date);
    const day = isOneDigit(oldDate.getDate());
    const month = isOneDigit(oldDate.getMonth() + 1);
    const year = oldDate.getFullYear();
    const hours = isOneDigit(oldDate.getHours());
    const minutes = isOneDigit(oldDate.getMinutes());
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function dealLimitionDateWithTime(date) {
    const oldDate = new Date(date);
    const day = isOneDigit(oldDate.getDate());
    const month = isOneDigit(oldDate.getMonth() + 1);
    const year = oldDate.getFullYear();
    const hours = isOneDigit(oldDate.getHours());
    const minutes = isOneDigit(oldDate.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function isOneDigit(date) {
    if (date >= 0 && date < 10) {
        return `0${date}`;
    }
    return date;
}
